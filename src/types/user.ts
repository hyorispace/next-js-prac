export interface User {
  id: number;
  nickname: string;
  birthday: string;
  sex: "m" | "w";
  isDeleted: boolean;
}
