/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define the structure of the association object
interface Association {
  email: string;
  deal_id: string;
}

// Define the store state
interface ContactDealState {
  association: Association;
  setContactDeal: (data: Partial<Association>) => void;
  resetContactDeal: () => void;
}

// Function to persist state in localStorage
const persistState = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadState = (key: string) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : { email: "", deal_id: "" };
};

// Create the store
const useContactDealStore = create<ContactDealState>((set) => ({
  // Load the initial state from localStorage or set default values
  association: loadState("contactDealAssociation"),

  // Update the state and persist it in localStorage
  setContactDeal: (data) =>
    set((prevState) => {
      const updatedState = {
        ...prevState.association,
        ...data,
      };
      persistState("contactDealAssociation", updatedState);
      return { association: updatedState };
    }),

  // Reset the state and clear from localStorage
  resetContactDeal: () => {
    persistState("contactDealAssociation", { email: "", deal_id: "" });
    set({ association: { email: "", deal_id: "" } });
  },
}));

export default useContactDealStore;
