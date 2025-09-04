import { useUser } from "@clerk/clerk-react";
import MainRoutes from "@/Routes/MainRoutes.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function App() {
  const {user , isLoaded} = useUser();
  console.log(user);
   useEffect(() => {
    if (isLoaded && user) {
      user.reload(); // forces Clerk to fetch latest metadata
    }
  }, [isLoaded, user]);

  return (
    <div className="">
      <MainRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
