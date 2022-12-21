import { api } from "@/api";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

type IMethods = "post" | "patch" | "delete";

interface IAppMutationHookProps {
  method?: IMethods;
  url: string;
  itemId?: number | string;
  params?: object;
  updater?: any;
  extraQueryKey?: string | string[];
}

const getApiFunc = (
  method: IMethods,
  url: string,
  itemId?: number | string
) => {
  let apiFunc: Function;
  switch (method) {
    case "post":
      apiFunc = api.post;
      break;
    case "patch":
      apiFunc = api.patch;
      break;
    case "delete":
      apiFunc = api.delete;
      break;
    default:
      apiFunc = api.get;
  }

  const urlForApi = itemId ? `${url}/${itemId}` : url;

  return (data?: any) => {
    return apiFunc({ url: urlForApi, data });
  };
};

const useAppMutation = ({
  method = "post",
  updater,
  url,
  itemId,
  params,
  extraQueryKey,
}: IAppMutationHookProps): UseMutationResult => {
  const queryClient = useQueryClient();
  const apiFunc = getApiFunc(method, url, itemId);
  return useMutation(apiFunc, {
    onMutate(data?: any) {
      queryClient.cancelQueries([url!, params]);
      const previousData = queryClient.getQueryData([url!, params]);
      queryClient.setQueryData([url!, params], (oldData: any) => {
        return updater ? updater(oldData, data) : oldData;
      });

      return previousData;
    },

    onError(error, _, context) {
      queryClient.setQueryData([url!, params], context);
    },

    onSettled(data, _e, _v, context) {
      queryClient.invalidateQueries([url!, params]);
      if (extraQueryKey) {
        queryClient.invalidateQueries(extraQueryKey);
      }
    },
  });
};

export default useAppMutation;
