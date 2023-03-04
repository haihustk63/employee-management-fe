import { API_ROUTES } from "@/api/routes";
import useFetch from "../useFetch";

export const useGetApplicationStatistics = (params: any) => {
  return useFetch({
    url: API_ROUTES.APPLICATION_STATISTICS,
    params,
  });
};

export const useGetEducationProgramStatistics = (params: any) => {
  return useFetch({
    url: API_ROUTES.EDUCATION_PROGRAM_STATISTICS,
    params,
  });
};

export const useGetTopsStatistics = () => {
  return useFetch({
    url: API_ROUTES.TOPS,
  });
};
