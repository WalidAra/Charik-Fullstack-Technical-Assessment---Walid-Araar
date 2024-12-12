import React from "react";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import AuthMiddleware from "../utils/AuthMiddleware";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthMiddleware>
      <main className="w-full lg:grid h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center h-screen">
          {children}
        </div>
        <div className="hidden relative bg-foreground lg:block h-screen p-6">
          <DotPattern
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
            )}
          />
        </div>
      </main>
    </AuthMiddleware>
  );
};

export default AuthLayout;
