import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useFetch from "../useFetch";

export const useGetAllDeliveries = () => {
  return useFetch({
    url: API_ROUTES.DELIVERY,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allDeliveries || []);
      },
    },
  });
};
