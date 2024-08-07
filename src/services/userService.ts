import apiClient from "@/api/apiClient";
import { User } from "@/types/user";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface UserParams {
  sortedBy: "birthday" | "nickname";
}

const getUserList = async (params: UserParams): Promise<User[]> => {
  const response = await apiClient.get("/users", {
    params: {
      _sort: params.sortedBy,
      isDeleted: false,
    },
  });

  return response.data;
};

const getDeletedUserList = async (): Promise<User[]> => {
  const response = await apiClient.get("/users", {
    params: {
      _sort: "id",
      _order: "desc",
      isDeleted: true,
    },
  });

  return response.data;
};

const deleteUserList = async (idList: number[]) => {
  const response = await apiClient.patch("/users", { idList });

  return response.data;
};

const addUser = async (user: Omit<User, "id">) => {
  const response = await apiClient.post("/users", user);

  return response.data;
};

const restoreUser = async (id: number) => {
  const response = await apiClient.patch(`/users/${id}`, {
    isDeleted: false,
  });

  return response.data;
};

export const userQueries = {
  default: () => ["user"],
  all: (params: UserParams) =>
    queryOptions({
      queryKey: [...userQueries.default(), "not-deleted", params],
      queryFn: () => getUserList(params),
    }),
  deleted: () =>
    queryOptions({
      queryKey: [...userQueries.default(), "deleted"],
      queryFn: getDeletedUserList,
    }),
};

export const useGetUserList = (params: UserParams) => {
  return useQuery(userQueries.all(params));
};

export const useGetDeletedUserList = () => {
  return useQuery(userQueries.deleted());
};

export const useDeleteUserList = (params: UserParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserList,
    onSuccess({ idList, userList }) {
      queryClient.setQueryData(userQueries.all(params).queryKey, (oldData) => {
        return oldData?.filter((user) => !idList.includes(user.id));
      });

      queryClient.invalidateQueries({ queryKey: userQueries.default() });

      if (!queryClient.getQueryData(userQueries.deleted().queryKey)) return;

      queryClient.setQueryData(userQueries.deleted().queryKey, (oldData) => {
        if (!oldData) return userList;

        return [...oldData, ...userList].sort(
          (user1, user2) => user2.id - user1.id
        );
      });
    },
  });
};

export const useAddUser = (params: UserParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess(user) {
      queryClient.setQueryData(userQueries.all(params).queryKey, (oldData) => {
        if (params.sortedBy === "nickname") {
          return [...oldData!, user as User].sort((user1, user2) =>
            user1.nickname > user2.nickname ? 1 : -1
          );
        }

        return [...oldData!, user as User].sort(
          (user1, user2) =>
            new Date(user1.birthday).getTime() -
            new Date(user2.birthday).getTime()
        );
      });

      queryClient.invalidateQueries({ queryKey: userQueries.default() });
    },
  });
};

export const useRestoreUser = (params: UserParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreUser,
    onSuccess(deletedUser) {
      queryClient.setQueryData(userQueries.deleted().queryKey, (oldData) => {
        return oldData?.filter((user) => user.id !== deletedUser.id);
      });

      queryClient.invalidateQueries({ queryKey: userQueries.default() });

      if (!queryClient.getQueryData(userQueries.all(params).queryKey)) return;

      queryClient.setQueryData(userQueries.all(params).queryKey, (oldData) => {
        if (params.sortedBy === "nickname") {
          return [...oldData!, deletedUser as User].sort((user1, user2) =>
            user1.nickname > user2.nickname ? 1 : -1
          );
        }

        return [...oldData!, deletedUser as User].sort(
          (user1, user2) =>
            new Date(user1.birthday).getTime() -
            new Date(user2.birthday).getTime()
        );
      });
    },
  });
};
