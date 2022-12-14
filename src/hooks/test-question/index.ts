import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetAllTestQuestions = (params: any) => {
  return useFetch({
    url: API_ROUTES.TEST_QUESTIONS,
    params,
    config: {
      select: (data: any) => {
        return addKeyToData(data.allTestQuestions, (item: any) => {
          return `${item.topicId}-${item.questionId}`;
        });
      },
    },
  });
};

export const useClassifiedQuestion = () => {
  return useFetch({
    url: API_ROUTES.TEST_QUESTIONS_CLASSIFIED,
  });
};

export const useGetOneTestQuestions = (questionId: string) => {
  return useFetch({
    url: API_ROUTES.TEST_QUESTIONS_ID(questionId),
    config: {
      enabled: !!questionId,
    },
  });
};

export const useCreateTestQuestion = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.TEST_QUESTIONS,
  });
};
