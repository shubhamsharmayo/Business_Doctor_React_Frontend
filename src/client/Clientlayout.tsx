import AppSidebar from "@/components/AppSidebar";
import TopNavBar from "@/components/TopMenubar";
import { useState } from "react";
import { fetchUserAllProjects } from "@/lib/api/project-management";
import { useProjectStore } from "@/store/projectStore";
import type { ProjectData } from "@/types/project.types";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useEffect } from "react";
import { Outlet } from "react-router";
import Loader from "./Loader";

const ClientLayout = () => {
  const { isLoaded, user } = useUser();

  // All hooks at top level
  const setProjects = useProjectStore((state) => state.setProjects);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const setSelectedProject = useProjectStore(
    (state) => state.setSelectedProject
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const clerkId = user?.id;
  // console.log("Clerk ID:", clerkId);

  const UserAllProjects = async (clerkId: string): Promise<ProjectData[]> => {
    //  console.log("Fetching projects for:", clerkId);
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

    // console.log(selectedProject);

    // Sync the selected project with updated data
    const existingSelected = useProjectStore.getState().selectedProject;
    if (existingSelected) {
      const updated = projectData.find((p) => p._id === existingSelected._id);
      if (updated) {
        setSelectedProject(updated);
      }
    }
  }, [projectData, selectedProject, setProjects, setSelectedProject]);

  useEffect(() => {
    const RemoveFromStorage = async () => {
      const sr = JSON.parse(localStorage.getItem("project-storage") || "null");
      console.log(sr);
      const data = await fetch(`${fetchUserAllProjects}/${clerkId}`);
      const res: { data: ProjectData[] } = await data.json();
      console.log(res.data);
      const foundId = res.data
        ?.flatMap((e) => e._id) // combine all clientIds into one array
        .find((id) => id === sr.state.selectedProject._id);
      console.log(foundId);
      if (!foundId) {
        setSelectedProject(res.data[0]);
      }
      // console.log(selectedProject);
    };

    RemoveFromStorage();
  }, [selectedProject, setSelectedProject, clerkId]);

  if (isLoading || !isLoaded) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <div className="my-24">Error: Error occured</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top bar at the top */}
      <TopNavBar />
      {/* <p>Client layout </p> */}

      {/* Main content area: sidebar + routed content */}
      <div className="flex">
        <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
