import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetNotificationConfig = () => {
  return useFetch({
    url: API_ROUTES.NOTIFICATION_CONFIG,
  });
};

export const useGetNotificationTopics = () => {
  return useFetch({
    url: API_ROUTES.NOTIFICATION_TOPICS,
  });
};

export const useCreateNotificationTopic = () => {
  return useAppMutation({
    method: "post",
    url: API_ROUTES.NOTIFICATION_TOPICS,
  });
};

export const useUpdateNotificationTopic = () => {
  return useAppMutation({
    method: "patch",
    url: API_ROUTES.NOTIFICATION_TOPICS,
  });
};

export const useDeleteNotificationTopic = () => {
  return useAppMutation({
    method: "delete",
    url: API_ROUTES.NOTIFICATION_TOPICS,
  });
};
