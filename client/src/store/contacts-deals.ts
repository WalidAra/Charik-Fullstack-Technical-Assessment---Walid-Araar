import { create } from "zustand";

interface ContactDealState {
  email: string;
  deal_id: string;
  setContactDeal: (email: string, deal_id: string) => void;
}

const useContactDealStore = create<ContactDealState>(
  (set: (partial: Partial<ContactDealState>) => void) => ({
    email: "",
    deal_id: "",
    setContactDeal: (email: string, deal_id: string) => set({ email, deal_id }),
  })
);

export default useContactDealStore;
