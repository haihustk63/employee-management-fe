import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetAllPositions = () => {
  return useFetch({
    url: API_ROUTES.POSITION,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allPositions || []);
      },
    },
  });
};

export const useCreatePosition = () => {
  return useAppMutation({
    url: API_ROUTES.POSITION,
    method: "post",
  });
};

export const useUpdatePosition = (positionId?: string | number) => {
  return useAppMutation({
    url: API_ROUTES.POSITION_ID(positionId as string),
    method: "patch",
    extraQueryKey: API_ROUTES.POSITION,
  });
};

export const useDeletePosition = (positionId?: string | number) => {
  return useAppMutation({
    url: API_ROUTES.POSITION_ID(positionId as string),
    method: "delete",
    extraQueryKey: API_ROUTES.POSITION,
  });
};
