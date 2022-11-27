import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useFetch from "../useFetch";

export const useGetEmployees = (params: object) => {
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
