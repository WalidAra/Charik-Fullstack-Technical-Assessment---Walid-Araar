/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "../ui/button";
import { LuLoader } from "react-icons/lu";
import useContactDealStore from "@/store/contacts-deals";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

// Define the expected response type from the API
interface CreateInteractionResponse {
  success: boolean;
  message: string;
}

// Define the payload type
interface CreateInteractionPayload {
  deal_id: string;
  email: string;
}

const LinkButton = ({ children }: { children: React.ReactNode }) => {
  const { association } = useContactDealStore();
  const { toast } = useToast();

  // Define the mutation for creating the interaction
  const createInteraction = useMutation<
    CreateInteractionResponse,
    AxiosError,
    CreateInteractionPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await axios.post<CreateInteractionResponse>(
        "http://127.0.0.1:4040/association/create/",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Interaction created",
        description: `Deal ${association.deal_id} is linked to ${association.email}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleClick = () => {
    const { deal_id, email } = association;
    console.log("deal , email :", deal_id, email);

    if (!deal_id || !email) {
      toast({
        title: "Error",
        description: "Please fill in the form",
      });
      return;
    }

    createInteraction.mutate({ deal_id, email });
  };

  return (
    <Button onClick={handleClick} className="flex items-center gap-2">
      {createInteraction.isPending ? (
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
