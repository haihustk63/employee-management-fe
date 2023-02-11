import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetAllTestQuestions = (params?: any) => {
  return useFetch({
    url: API_ROUTES.TEST_QUESTIONS,
    params,
    config: {
      select: (result: any) => {
        return {
          ...result,
          data: addKeyToData(result.data, (item: any) => {
            return `${item.topicId}-${item.questionId}`;
          }),
        };
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

export const useUpdateTestQuestion = (questionId: string | number) => {
  return useAppMutation({
    method: "patch",
    url: API_ROUTES.TEST_QUESTIONS_ID(questionId),
    extraQueryKey: API_ROUTES.TEST_QUESTIONS,
  });
};

export const useDeleteTestQuestion = (questionId: string | number) => {
  return useAppMutation({
    method: "delete",
    url: API_ROUTES.TEST_QUESTIONS_ID(questionId),
    extraQueryKey: API_ROUTES.TEST_QUESTIONS,
  });
};
