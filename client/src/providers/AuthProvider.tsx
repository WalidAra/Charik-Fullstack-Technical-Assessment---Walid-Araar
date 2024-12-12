/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";

type Props = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Auth = createContext<Props>({
  token: null,
  setToken: () => {},
});

import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  return (
    <Auth.Provider
      value={{
        setToken,
        token,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;
