import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";

export const useCreateRandomTest = () => {
  return useAppMutation({
    url: API_ROUTES.CREATE_TEST,
    method: "post",
  });
};
