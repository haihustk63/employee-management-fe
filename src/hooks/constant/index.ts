import { API_ROUTES } from "@/api/routes";
import { useFetchMany } from "../useFetch";

export const useGetConstantTestQuestion = () => {
  return useFetchMany({
    urlArray: [
      `${API_ROUTES.CONSTANT_TEST_QUESTIONS}?name=types`,
      `${API_ROUTES.CONSTANT_TEST_QUESTIONS}?name=levels`,
    ],
  });
};
