import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useCheckInOut = (type: 0 | 1) => {
  return useAppMutation({
    url: API_ROUTES.CHECK_IN_OUT,
    method: "post",
    extraQueryKey: `${API_ROUTES.CHECK_IN_OUT}?type=${type}`,
  });
};

export const useGetCheckInOutInfo = (type: 0 | 1) => {
  return useFetch({
    url: `${API_ROUTES.CHECK_IN_OUT}?type=${type}`,
  });
};
