import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useCreateAccount = () => {
  return useAppMutation({
    url: API_ROUTES.ACCOUNTS,
    method: "post",
  });
};

export const useGetAccounts = (params?: any) => {
  return useFetch({
    url: API_ROUTES.ACCOUNTS,
    config: {
      select: (results: any) => {
        return {
          ...results,
          data: addKeyToData(results?.data),
        };
      },
    },
    params,
  });
};

export const useUpdateAccount = () => {
  return useAppMutation({
    url: API_ROUTES.ACCOUNTS,
    method: "patch",
  });
};

export const useDeleteAccount = () => {
  return useAppMutation({
    url: API_ROUTES.ACCOUNTS,
    method: "delete",
  });
};

export const useUpdatePassword = () => {
  return useAppMutation({
    url: API_ROUTES.CHANGE_PASSWORD,
    method: "patch",
  });
};
