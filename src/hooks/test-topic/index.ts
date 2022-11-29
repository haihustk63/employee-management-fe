import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useFetch from "../useFetch";

export const useGetAllTestTopics = () => {
  return useFetch({
    url: API_ROUTES.TEST_TOPICS,
    config: {
      select: (data: any) => {
        return addKeyToData(data.allTestTopics);
      },
    },
  });
};
