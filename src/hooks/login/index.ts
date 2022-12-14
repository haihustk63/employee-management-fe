import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";

const useLoginCandidate = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.LOGIN_CANDIDATE,
  });
};

export { useLoginCandidate };
