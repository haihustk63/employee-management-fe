import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
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

export const useSubmitAnswer = (testId: number) => {
  return useAppMutation({
    url: API_ROUTES.TEST_ID(testId),
    method: "post",
  });
};

export const useGetTest = (testId: number, enabled: boolean) => {
  return useFetch({
    url: API_ROUTES.TEST_ID(testId),
    config: {
      enabled: typeof testId === "number" && enabled,
      select: (data: any) => {
        return data.test;
      },
    },
  });
};

export const useGetTestStatus = (testId: number) => {
  return useFetch({
    url: API_ROUTES.TEST_STATUS(testId),
    config: {
      enabled: typeof testId === "number",
    },
  });
};

export const useGetAllTests = () => {
  return useFetch({
    url: API_ROUTES.TEST,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.tests);
      },
    },
  });
};
