import axios from "axios";

axios.defaults.withCredentials = true;

export const api = {
  get<T>({ url, params }: any): Promise<T> {
    return axios.get<any, T>(url, { params });
  },

  post({ url, data }: any): Promise<any> {
    return axios.post(url, { data });
  },

  patch({ url, data }: any): Promise<any> {
    return axios.patch(url, { data });
  },

  delete({ url, data }: any): Promise<any> {
    return axios.delete(url, { data: { data } });
  },
};

export async function fetcher<T>({ queryKey, pageParam }: any): Promise<T> {
  const [url, params] = queryKey as any;

  const response = (await api.get<T>({
    url,
    params: { ...params, pageParam },
  })) as any;
  return response.data;
}
