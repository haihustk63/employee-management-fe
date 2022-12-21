import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
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
