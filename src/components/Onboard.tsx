// /src/pages/Onboard.tsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Onboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_NODE_API_URL}/user/register`, {
          clerkId: user.id,
          name: `${user.username}`,
          email: user.primaryEmailAddress?.emailAddress,
          role: "client",
        });

        navigate("/client/dashboard");
      } catch (err) {
        console.error("Failed to sync user to DB", err);
      }
    };

    syncUser();
  }, [user, isLoaded]);

  return <div className="flex items-center justify-center h-[calc(100vh-90px)]">Setting up your account...</div>;
}
