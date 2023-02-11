import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetRequests = (params: any) => {
  return useFetch({
    url: API_ROUTES.REQUESTS,
    config: {
      select: (results: any) => {
        return {
          ...results,
          data: addKeyToData(results?.data),
        };
      },
    },
    params,
  });
};

export const useCreateRequest = () => {
  return useAppMutation({
    url: API_ROUTES.REQUESTS,
    method: "post",
  });
};

export const useDeleteRequest = (requestId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.REQUEST_ID(requestId),
    method: "delete",
    extraQueryKey: API_ROUTES.REQUESTS,
  });
};

export const useUpdateRequest = (requestId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.REQUEST_ID(requestId),
    method: "patch",
    extraQueryKey: API_ROUTES.REQUESTS,
  });
};
