import instance from "./index";
import { IAccountItem } from "@/types/account";
export const getAccount = () => {
  return instance.get("/account");
};
export const getAccountByMonth = (month: string) => {
  return instance.get("/account?month=" + month);
};

export const createAccount = (data: IAccountItem) => {
  return instance({
    url: "/account",
    method: "post",
    data,
  });
};

export const deleteAccount = (id: number) => {
  return instance({
    url: "/account",
    method: "delete",
    data: {
      id,
    },
  });
};
