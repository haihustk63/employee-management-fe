import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import { useFetchMany } from "../useFetch";

export const useGetConstantTestQuestion = () => {
  return useFetchMany({
    urlArray: [
      {
        url: `${API_ROUTES.CONSTANT_TEST_QUESTIONS}?name=types`,
      },
      {
        url: `${API_ROUTES.CONSTANT_TEST_QUESTIONS}?name=levels`,
      },
    ],
  });
};

export const useGetConstantTestQuestionValue = () => {
  return useFetchMany({
    urlArray: [
      {
        url: `${API_ROUTES.CONSTANT_TEST_QUESTIONS}?name=types`,
        select: ({ types }: any) => {
          return addKeyToData(Object.values(types));
        },
      },
      {
        url: `${API_ROUTES.CONSTANT_TEST_QUESTIONS}?name=levels`,
        select: ({ levels }: any) => {
          return addKeyToData(Object.values(levels));
        },
      },
    ],
  });
};
