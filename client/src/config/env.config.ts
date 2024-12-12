const envConfig = {
  apiUrl: import.meta.env.VITE_PUBLIC_API_URL as string,
  bearer: import.meta.env.VITE_PUBLIC_BEARER as string,
};

export default envConfig;
