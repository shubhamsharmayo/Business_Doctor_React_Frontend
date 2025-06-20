import AppSidebar from "@/components/AppSidebar";
import TopMenubar from "@/components/TopMenubar";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Outlet } from "react-router";

const CoachLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar at the top */}
      {/* Show user avatar when signed in */}
      <div className="flex justify-between">
        <span className="font-semibold ml-6 mb-2 text-xl">Business Doctors</span>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Main content area: sidebar + routed content */}
      <div className="flex flex-1 overflow-hidden">
        <div className=" border-r">
          <AppSidebar />
        </div>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CoachLayout;
