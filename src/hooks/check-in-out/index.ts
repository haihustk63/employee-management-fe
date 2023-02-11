import { API_ROUTES } from "@/api/routes";
import { addKeyToData, getRowsTimesheet } from "@/utils";
import useAppMutation from "../useAppMutation";
import useFetch from "../useFetch";

export const useCheckInOut = (type: 0 | 1) => {
  return useAppMutation({
    url: API_ROUTES.CHECK_IN_OUT,
    method: "post",
    extraQueryKey: [
      `${API_ROUTES.CHECK_IN_OUT}?type=${type}`,
      API_ROUTES.CHECK_IN_OUT_LIST,
    ],
  });
};

export const useGetCheckInOutInfo = (type: 0 | 1) => {
  return useFetch({
    url: `${API_ROUTES.CHECK_IN_OUT}?type=${type}`,
  });
};

export const useGetCheckInOutList = () => {
  return useFetch({
    url: API_ROUTES.CHECK_IN_OUT_LIST,
    config: {
      select: (data: any) => {
        return addKeyToData(data);
      },
    },
  });
};

export const useGetCheckInOutTimesheet = () => {
  return useFetch({
    url: API_ROUTES.CHECK_IN_OUT_TIMESHEET,
    config: {
      select: (results: any) => {
        return {
          ...results,
          data: addKeyToData(getRowsTimesheet(results.data)),
        };
      },
    },
  });
};
