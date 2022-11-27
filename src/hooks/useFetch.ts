import { fetcher } from "@/api";
import { useQuery, UseQueryOptions } from "react-query";

export interface IUseFetchProps<T> {
  url: string;
  params?: object;
  config?: UseQueryOptions<T>;
}

const useFetch = <T>({ url, params, config }: IUseFetchProps<T>) => {
  return useQuery<T>([url!, params], fetcher<T>, {
    enabled: !!url,
    ...config,
  });
};

export default useFetch;
