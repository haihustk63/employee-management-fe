import { API_ROUTES } from "@/api/routes";
import { ICandidateProfile } from "./interface";
import useFetch from "../useFetch";
import { addKeyToData } from "@/utils";

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
