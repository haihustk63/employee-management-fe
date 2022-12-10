import { fetcher } from "@/api";
import { useQueries, useQuery, UseQueryOptions } from "react-query";

export interface IUseFetchProps<T> {
  url: string;
  params?: object;
  config?: UseQueryOptions<T>;
}

export interface IUseFetchManyProps<T> {
  urlArray: { url: string; select?: any }[];
  paramsArray?: any[];
  // config?: UseQueryOptions<T>;
}

const useFetch = <T>({ url, params, config }: IUseFetchProps<T>) => {
  return useQuery<T>([url!, params], fetcher<T>, {
    enabled: !!url,
    ...config,
  });
};

export const useFetchMany = <T>({
  urlArray,
  paramsArray,
}: IUseFetchManyProps<T>) => {
  const queries: UseQueryOptions[] = urlArray?.map(
    ({ url, select }, index: number) => ({
      queryKey: [url!, paramsArray?.[index]],
      queryFn: fetcher,
      select,
    })
  );
  return useQueries(queries);
};

export default useFetch;
