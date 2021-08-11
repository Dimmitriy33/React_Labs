import { IUser } from "@/components/users/userContext";

export interface IUserStore {
  user: IUser;
  token: string;
  isAuthenticated: boolean;
}
