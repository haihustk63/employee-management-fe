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

export const useGetTest = (testId: number | string, enabled: boolean) => {
  return useFetch({
    url: API_ROUTES.TEST_ID(testId),
    config: {
      enabled,
      select: (data: any) => {
        return data.test;
      },
    },
  });
};

// export const useGetTestStatus = (testId: number) => {
//   return useFetch({
//     url: API_ROUTES.TEST_STATUS(testId),
//     config: {
//       enabled: typeof testId === "number",
//     },
//   });
// };

export const useGetAllTests = (params: any) => {
  return useFetch({
    url: API_ROUTES.TEST,
    config: {
      select: (result: any) => {
        return {
          ...result,
          data: addKeyToData(result?.data),
        };
      },
    },
    params,
  });
};

//candidate test

export const useSubmitAnswer = (testId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.SUBMIT_TEST,
    method: "post",
    extraQueryKey: API_ROUTES.CONTESTANT_TEST_ID(testId),
  });
};

export const useGetContestantTests = () => {
  return useFetch({
    url: API_ROUTES.CONTESTANT_TEST,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.tests);
      },
    },
  });
};

export const useAssignTest = () => {
  return useAppMutation({
    url: API_ROUTES.CONTESTANT_TEST,
    method: "post",
  });
};

export const useGetContestantTest = (testId: string | number) => {
  return useFetch({
    url: API_ROUTES.CONTESTANT_TEST_ID(testId),
  });
};

export const useUpdateContestantTest = (testId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.CONTESTANT_TEST_ID(testId),
    method: "patch",
  });
};

export const useUpdateTest = (testId: number | string) => {
  return useAppMutation({
    url: API_ROUTES.TEST_ID(testId),
    method: "patch",
  });
};

export const useDeleteTest = (testId: number | string) => {
  return useAppMutation({
    url: API_ROUTES.TEST_ID(testId),
    method: "delete",
    extraQueryKey: API_ROUTES.TEST,
  });
};
