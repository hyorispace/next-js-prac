import { useGetDeletedUserList, userQueries } from "@/services/userService";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

interface DeleteProps {
  dehydratedState: DehydratedState;
}

const Delete: NextPage<DeleteProps> = ({ dehydratedState }) => {
  const { data } = useGetDeletedUserList();

  console.log(data);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <Head>
          <title>delete 페이지</title>
        </Head>
        <>Delete 페이지</>
      </Container>
    </HydrationBoundary>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(userQueries.deleted());

  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
};

export default Delete;

const Container = styled.div`
  background-color: pink;
`;
