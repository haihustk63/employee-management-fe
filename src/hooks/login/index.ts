import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";

const useLoginEmployee = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.LOGIN_EMPLOYEE,
  });
};

const useLogoutEmployee = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.LOGOUT_EMPLOYEE,
  });
};

export { useLoginEmployee, useLogoutEmployee };
