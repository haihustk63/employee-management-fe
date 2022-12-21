import { API_ROUTES } from "@/api/routes";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useCreateRandomTest = () => {
  return useAppMutation({
    url: API_ROUTES.CREATE_TEST_RANDOM,
    method: "post",
  });
};

export const useCreateTest = () => {
  return useAppMutation({
    url: API_ROUTES.CREATE_TEST,
    method: "post",
  });
};

export const useSaveTest = () => {
  return useAppMutation({
    url: API_ROUTES.SAVE_TEST,
    method: "post",
  });
};

export const useGetTest = (testId: number) => {
  return useFetch({
    url: API_ROUTES.GET_TEST(testId),
    config: {
      enabled: typeof testId === "number",
      select: (data: any) => {
        return data.test;
      },
    },
  });
};
