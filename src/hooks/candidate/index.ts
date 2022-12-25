import { API_ROUTES } from "@/api/routes";
import { ICandidateProfile } from "./interface";
import useFetch from "../useFetch";
import { addKeyToData } from "@/utils";
import useAppMutation from "../useAppMutation";

//profile
export const useGetCandidateProfile = () => {
  return useFetch<ICandidateProfile[]>({
    url: API_ROUTES.CANDIDATE_PROFILE,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allApplications || []);
      },
    },
  });
};

export const useUpdateCandidateProfile = (candidateId: string) => {
  return useAppMutation({
    url: API_ROUTES.CANDIDATE_PROFILE_ID(candidateId),
    method: "patch",
    extraQueryKey: API_ROUTES.CANDIDATE_PROFILE,
  });
};

export const useDeleteCandidateProfile = (candidateId: string) => {
  return useAppMutation({
    url: API_ROUTES.CANDIDATE_PROFILE_ID(candidateId),
    method: "delete",
    extraQueryKey: API_ROUTES.CANDIDATE_PROFILE,
  });
};

//account
export const useGetCandidateAccount = () => {
  return useFetch({
    url: API_ROUTES.CANDIDATE_ACCOUNT,
    config: {
      select: (data: any) => {
        return addKeyToData(data?.allAccounts || []);
      },
    },
  });
};

export const useCreateCandidateAccount = () => {
  return useAppMutation({
    url: API_ROUTES.CANDIDATE_ACCOUNT,
    method: "post",
  });
};

export const useDeleteCandidateAccount = (username?: string) => {
  if (!username) return;
  return useAppMutation({
    url: API_ROUTES.CANDIDATE_ACCOUNT,
    itemId: username,
    method: "delete",
  });
};
