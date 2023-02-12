import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";

export const useLinkFirebase = () => {
  return useAppMutation({
    url: API_ROUTES.FIREBASE_ACCOUNT,
    method: "post",
  });
};

export const useUnlinkFirebase = () => {
  return useAppMutation({
    url: API_ROUTES.FIREBASE_ACCOUNT,
    method: "delete",
  });
};

export const useLoginWithFirebase = () => {
  return useAppMutation({
    url: API_ROUTES.FIREBASE_ACCOUNT_LOGIN,
    method: "post",
  });
};
