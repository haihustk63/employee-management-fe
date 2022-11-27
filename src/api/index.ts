import { QueryFunctionContext } from "react-query";
import axios from "axios";

const api = {
  get: async function <T>({ url, params }: any): Promise<T> {
    const response = await axios.get(url, { params });
    return response.data;
  },
};

export function fetcher<T>({ queryKey, pageParam }: any): Promise<T> {
  const [url, params] = queryKey as any;

  const data = api.get<T>({ url, params: { ...params, pageParam } });
  return data;
}
