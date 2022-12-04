import { api } from "@/api";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

type IMethods = "create" | "update" | "delete";

interface IAppMutationHookProps {
  method?: IMethods;
  url: string;
  params?: object;
  updater?: any;
}

const getApiFunc = (method: IMethods, url: string) => {
  let apiFunc: Function;
  switch (method) {
    case "create":
      apiFunc = api.post;
      break;

    case "update":
      apiFunc = api.patch;
      break;
    case "delete":
      apiFunc = api.delete;
      break;
    default:
      apiFunc = api.get;
  }

  return (data: any) => {
    return apiFunc({ url, data });
  };
};

const useAppMutation = ({
  method = "create",
  updater,
  url,
  params,
}: IAppMutationHookProps): UseMutationResult => {
  const queryClient = useQueryClient();
  const apiFunc = getApiFunc(method, url);
  return useMutation(apiFunc, {
    onMutate(data: any) {
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
    },
  });
};

export default useAppMutation;
