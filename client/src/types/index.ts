/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fetch = {
  accessToken?: string | null;
  feature: "auth" | "client" | "oauth" | "chats";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  includeAccessToken?: boolean;
  callback?: (() => void) | ((res: FetchResponse<any>) => void);
};

export type FetchResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type AccessToken = {
  accessToken: string;
};

export type Client = {
  id: string;
  email: string;
  name: string;
};
