import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";

const useLoginEmployee = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.LOGIN_EMPLOYEE,
  });
};

export { useLoginEmployee };
