
import { envConfig } from "@/config";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

type Props = {
  isSignUp: boolean;
};

const GoogleOAuth = ({ isSignUp }: Props) => {
  return (
    <Button
      onClick={() => {
        window.location.href = `${envConfig.apiUrl}/api/public/oauth/google`;
      }}
      variant="outline"
      className="w-full mt-4 items-center flex gap-2"
    >
      <FcGoogle className="size-5" />
      {isSignUp ? "Register" : "Login"} with Google
    </Button>
  );
};

export default GoogleOAuth;
