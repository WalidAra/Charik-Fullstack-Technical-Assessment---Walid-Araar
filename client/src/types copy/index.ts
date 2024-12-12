export type Fetch = {
  accessToken?: string;
  feature: "auth" | "language"|"prompt";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
};

export type FetchResponse<T> = {
  data: T;
  message: string;
};

export type AccessToken = {
  accessToken: string;
};

export type language = {
  language: string;
};
