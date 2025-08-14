// /src/pages/Onboard.tsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Onboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[Onboard] useEffect triggered");
    console.log("[Onboard] isLoaded:", isLoaded);
    console.log("[Onboard] user object:", user);

    if (!isLoaded || !user) {
      console.log("[Onboard] User not loaded yet. Skipping sync.");
      return;
    }

    const syncUser = async () => {
      console.log("[Onboard] Preparing to sync user to backend...");

      const payload = {
        clerkId: user.id,
        name: `${user.username}`, // Could be null
        email: user.primaryEmailAddress?.emailAddress,
        role: "client",
      };

      console.log("[Onboard] Payload to send:", payload);
      console.log("[Onboard] API URL:", import.meta.env.VITE_NODE_API_URL);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_NODE_API_URL}/user/register`,
          payload
        );

        console.log("[Onboard] Sync successful. Response:", response.data);
        console.log("[Onboard] Navigating to /client/dashboard...");
        navigate("/client/dashboard");
      } catch (err) {
        console.error("[Onboard] Failed to sync user to DB:", err);
        // if (err.response) {
        //   console.error("[Onboard] Backend responded with:", err.response.data);
        // }
      }
    };

    syncUser();
  }, [user, isLoaded, navigate]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-90px)]">
      Setting up your account...
    </div>
  );
}
