import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetRequests = () => {
  return useFetch({
    url: API_ROUTES.REQUESTS,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allRequests);
      },
    },
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
    extraQueryKey: API_ROUTES.REQUESTS
  });
};

export const useUpdateRequest = (requestId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.REQUEST_ID(requestId),
    method: "patch",
    extraQueryKey: API_ROUTES.REQUESTS
  });
};
