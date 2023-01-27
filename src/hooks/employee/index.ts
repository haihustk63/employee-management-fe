import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetEmployees = (params?: object) => {
  return useFetch({
    url: API_ROUTES.EMPLOYEE_PROFILE,
    params,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allEmployeeProfile);
      },
    },
  });
};

export const useGetEmployeeById = (employeeId: string) => {
  return useFetch({
    url: API_ROUTES.EMPLOYEE_PROFILE_ID(employeeId),
    config: {
      enabled: !!employeeId,
      select: (data: any) => {
        return data?.employeeProfile;
      },
    },
  });
};

export const useCreateEmployeeProfile = () => {
  return useAppMutation({
    url: API_ROUTES.EMPLOYEE_PROFILE,
    method: "post",
  });
};

export const useUpdateEmployeeProfile = (employeeId: number | string) => {
  return useAppMutation({
    url: API_ROUTES.EMPLOYEE_PROFILE_ID(employeeId),
    method: "patch",
    extraQueryKey: API_ROUTES.EMPLOYEE_PROFILE,
  });
};

export const useDeleteEmployeeProfile = (employeeId: number | string) => {
  return useAppMutation({
    url: API_ROUTES.EMPLOYEE_PROFILE_ID(employeeId),
    method: "delete",
    extraQueryKey: API_ROUTES.EMPLOYEE_PROFILE,
  });
};
