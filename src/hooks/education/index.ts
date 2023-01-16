import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetAllEducationPrograms = (params?: any) => {
  return useFetch({
    url: API_ROUTES.EDUCATION_PROGRAM,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allPrograms);
      },
    },
    params,
  });
};

export const useGetMyEducationPrograms = (params?: any) => {
  return useFetch({
    url: API_ROUTES.MY_EDUCATION_PROGRAM,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allPrograms);
      },
    },
    params,
  });
};

export const useGetEducationProgramById = (programId: string | number) => {
  return useFetch({
    url: API_ROUTES.EDUCATION_PROGRAM_ID(programId),
    config: {
      enabled: !!programId,
    },
  });
};

export const useCreateEducationProgram = () => {
  return useAppMutation({
    url: API_ROUTES.EDUCATION_PROGRAM,
    method: "post",
  });
};

export const useUpdateEducationProgram = (programId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.EDUCATION_PROGRAM_ID(programId),
    method: "patch",
  });
};

export const useDeleteEducationProgram = (programId: string | number) => {
  return useAppMutation({
    url: API_ROUTES.EDUCATION_PROGRAM_ID(programId),
    method: "delete",
    extraQueryKey: API_ROUTES.EDUCATION_PROGRAM,
  });
};

export const useJoinEducationProgram = () => {
  return useAppMutation({
    url: API_ROUTES.EDUCATION_PROGRAM_JOIN,
    method: "post",
    extraQueryKey: [
      API_ROUTES.EDUCATION_PROGRAM,
      API_ROUTES.MY_EDUCATION_PROGRAM,
    ],
  });
};

export const useUnJoinEducationProgram = () => {
  return useAppMutation({
    url: API_ROUTES.EDUCATION_PROGRAM_JOIN,
    method: "delete",
    extraQueryKey: [
      API_ROUTES.EDUCATION_PROGRAM,
      API_ROUTES.MY_EDUCATION_PROGRAM,
    ],
  });
};

export const useRateEducationProgram = () => {
  return useAppMutation({
    url: API_ROUTES.RATE_EDUCATION_PROGRAM,
    method: "patch",
    extraQueryKey: [
      API_ROUTES.EDUCATION_PROGRAM,
      API_ROUTES.MY_EDUCATION_PROGRAM,
    ],
  });
};
