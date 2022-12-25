import { API_ROUTES } from "@/api/routes";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useGetAllJobs = (params?: any) => {
  return useFetch({
    url: API_ROUTES.JOBS,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allJobs);
      },
    },
    params,
  });
};

export const useGetJobById = (jobId?: string) => {
  return useFetch({
    url: `${API_ROUTES.JOBS}/${jobId}`,
  });
};

export const useCreateJob = () => {
  return useAppMutation({
    url: API_ROUTES.JOBS,
    method: "post",
  });
};

export const useUpdateJob = (jobId?: string) => {
  return useAppMutation({
    url: `${API_ROUTES.JOBS}/${jobId}`,
    method: "patch",
  });
};

export const useDeleteJob = (jobId?: string) => {
  return useAppMutation({
    url: `${API_ROUTES.JOBS}/${jobId}`,
    method: "delete",
    extraQueryKey: API_ROUTES.JOBS,
  });
};
