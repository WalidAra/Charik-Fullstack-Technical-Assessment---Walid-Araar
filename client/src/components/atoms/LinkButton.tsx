import React, { useState } from "react";
import { Button } from "../ui/button";
import { LuLoader } from "react-icons/lu";
import useContactDealStore from "@/store/contacts-deals";
import { useToast } from "@/hooks/use-toast";

const LinkButton = ({ children }: { children: React.ReactNode }) => {
  const { deal_id, email } = useContactDealStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchData = async () => {
    if (!deal_id && !email) {
      toast({
        title: "Error",
        description: "Please fill in the form",
      });
      return;
    }

    setIsLoading(true);

    const response = await fetch(
      "http://127.0.0.1:4040/api/private/link/interactions/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deal_id,
          email,
        }),
      }
    );

    const data = await response.json();

    if (data) {
      toast({
        title: `Interaction created`,
        description: `Deal ${deal_id} is linked to ${email}`,
      });
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={fetchData} className="flex items-center gap-2">
      {isLoading ? (
        <span className="animate-spin">
          <LuLoader />
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default LinkButton;
