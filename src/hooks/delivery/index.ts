import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

const { DELIVERY, DELIVERY_ID } = API_ROUTES;

export const useGetAllDeliveries = () => {
  return useFetch({
    url: DELIVERY,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allDeliveries || []);
      },
    },
  });
};

export const useCreateDelivery = () => {
  return useAppMutation({ method: "post", url: DELIVERY });
};

export const useDeleteDelivery = (deliveryId: number) => {
  return useAppMutation({
    method: "delete",
    url: DELIVERY,
    itemId: deliveryId,
  });
};
