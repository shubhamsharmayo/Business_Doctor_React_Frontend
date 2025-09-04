import { create } from "zustand";
import { NODE_API_BASE_URL} from "@/lib/api_base_url";


type User = {
  _id: string;
  clerkId: string;
  name: string | null;
  email: string;
  role: "client" | "coach" | "admin"; // extend if you have more roles
  isPurchased: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  plan: "basic" | "pro" | "enterprise"; // adjust based on your plans
  coachId?: string; // optional if some users don't have a coach
  // add more fields as per your API response
};

type UserStore = {
  userData: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: (id: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  loading: false,
  error: null ,

  fetchUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${NODE_API_BASE_URL}/user/find-user/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");

      const data: User = await res.json();
      set({ userData: data, loading: false });
    } catch (err:unknown) {
       let message = "Unknown error";
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    }
      set({ error: message, loading: false });
    }
  },
}));
