import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

const { DELIVERY } = API_ROUTES;

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
  return useAppMutation({ method: "create", url: DELIVERY });
};
