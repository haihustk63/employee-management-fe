import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
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

export const useCreateTopic = () => {
  return useAppMutation({
    url: API_ROUTES.TEST_TOPICS,
    method: "post",
  });
};

export const useUpdateTopic = (topicId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.TEST_TOPIC_ID(topicId),
    method: "patch",
    extraQueryKey: API_ROUTES.TEST_TOPICS,
  });
};

export const useDeleteTopic = (topicId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.TEST_TOPIC_ID(topicId),
    method: "delete",
    extraQueryKey: API_ROUTES.TEST_TOPICS,
  });
};
