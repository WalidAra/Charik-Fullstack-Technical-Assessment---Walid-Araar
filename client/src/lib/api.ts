import { envConfig } from "@/config";
import { Fetch, FetchResponse } from "@/types";
import { api } from "@/utils";
const { apiUrl, bearer } = envConfig;

const fetchData = async <T>({
  endpoint,
  accessToken,
  feature,
  method,
  data,
}: Fetch): Promise<FetchResponse<T>> => {
  const url = `${apiUrl}/api/${
    accessToken ? "private" : "public"
  }/${feature}/${endpoint}`;

  const axiosConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { [bearer]: `Bearer ${accessToken}` }),
    },
    withCredentials: true,
    data,
  };

  const res = await api(axiosConfig);
  const result = res.data as FetchResponse<T>;
  return result;
};

export default fetchData;
