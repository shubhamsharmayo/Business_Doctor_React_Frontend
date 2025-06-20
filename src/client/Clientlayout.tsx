import AppSidebar  from "@/components/AppSidebar";
import TopMenubar from "@/components/TopMenubar";
import { Outlet } from "react-router";

const ClientLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar at the top */}
      <TopMenubar />

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

export default ClientLayout;
