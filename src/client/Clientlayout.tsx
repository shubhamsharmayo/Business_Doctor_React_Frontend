import AppSidebar  from "@/components/AppSidebar";
import TopNavBar from "@/components/TopMenubar";

import { fetchUserAllProjects } from "@/lib/api/project-management";
import { useProjectStore } from "@/store/projectStore";
import type { ProjectData } from "@/types/project.types";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router";

const ClientLayout = () => {

  const { isLoaded,user } = useUser();

  // All hooks at top level
  const setProjects = useProjectStore((state) => state.setProjects);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

  const clerkId = user?.id;
  console.log("Clerk ID:", clerkId);

 

  const UserAllProjects = async (clerkId:string): Promise<ProjectData[]> => {
       console.log("Fetching projects for:", clerkId);
    const { data } = await axios.get(`${fetchUserAllProjects}/${clerkId}`);
      return data?.data;
    };

    

  
    const {
    data: projectData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchProjectDataDetails", clerkId], // Include clerkId in queryKey for better caching
    queryFn: () => UserAllProjects(clerkId!),
    retry: 2,
    retryDelay: 1000,
    enabled: !!clerkId,
  });
  
  
  useEffect(() => {
    if (!projectData) return;
    setProjects(projectData);
  
    // Sync the selected project with updated data
    const existingSelected = useProjectStore.getState().selectedProject;
    if (existingSelected) {
      const updated = projectData.find((p) => p._id === existingSelected._id);
      if (updated) {
        setSelectedProject(updated);
      }
    }
  }, [projectData, selectedProject, setProjects, setSelectedProject]);

  

  
    if (isLoading || !isLoaded) {
      return <div className="my-24">Loading...</div>;
    }
    if (isError) {
      return <div className="my-24">Error: Error occured</div>;
    }
  

   
  return (
    <div className="flex flex-col h-[calc(100vh-.5rem)] my-8">
      {/* Top bar at the top */}
      <TopNavBar/>
      <p>Client layout </p>

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
