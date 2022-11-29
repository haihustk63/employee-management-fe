import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useFetch from "../useFetch";

export const useGetAllTestQuestions = () => {
  return useFetch({
    url: API_ROUTES.TEST_QUESTIONS,
    config: {
      select: (data: any) => {
        return addKeyToData(data.allTestQuestions);
      },
    },
  });
};
