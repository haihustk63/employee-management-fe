import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";

const useLoginCandidate = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.LOGIN_CANDIDATE,
  });
};

const useLoginEmployee = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.LOGIN_EMPLOYEE,
  });
};

export { useLoginCandidate, useLoginEmployee };
