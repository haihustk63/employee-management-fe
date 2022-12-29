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

export const useGetAccounts = () => {
  return useFetch({
    url: API_ROUTES.ACCOUNTS,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allAccounts);
      },
    },
  });
};

// export const useUpdateEmployeeAccount = (employeeId: string| number) => {
//   return useAppMutation({
//     url: API_ROUTES.EMPLOYEE_ACCOUNT_ID(employeeId),
//     method: "patch",
//     extraQueryKey: API_ROUTES.EMPLOYEE_ACCOUNTS
//   });
// };

export const useDeleteAccount = (email: string) => {
  return useAppMutation({
    url: API_ROUTES.ACCOUNT_EMAIL(email),
    method: "delete",
    extraQueryKey: API_ROUTES.ACCOUNTS,
  });
};
