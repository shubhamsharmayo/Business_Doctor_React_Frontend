import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProgressControl from "@/components/Client/ProgressControl.tsx";
import { Button } from "../components/ui/button";
import BusinessPlanProgress from "@/components/Client/BusinessPlanProgress.tsx";
import db from "@/db/dexieDB.js";

import SelectProject from '@/components/Client/Project Management/SelectProject.tsx';
import { useUser } from "@clerk/clerk-react";

import {CreateProject} from '@/components/Client/Project Management/CreateProject.tsx';

import { useProjectStore } from "@/store/projectStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUserAllProjects } from "@/lib/api/project-management";
import axios from "axios";

const ClientDashboard = () => {
  const navigate = useNavigate();

const { user } = useUser();
  const clerkId = user?.id;

  const selectedProject = useProjectStore((state) => state.selectedProject);

  const setProjects = useProjectStore(
    (state) => state.setProjects
  );
  

  const UserAllProjects = async (clerkId:string): Promise<ProjectData[]> => {
    const { data } = await axios.get(`${fetchUserAllProjects}/${clerkId}`);
    return data?.data;
  };

  const {
  data: projectData,
  isLoading,
  isError,
} = useQuery<ProjectData[], Error>({
  queryKey: ["fetchProjectDataDetails", clerkId], // Include clerkId in queryKey for better caching
  queryFn: () => UserAllProjects(clerkId!),
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
      useProjectStore.getState().setSelectedProject(updated);
    }
  }
}, [projectData]);




  const handleNavigate = () => {
    navigate("/client/chat");
  };

  {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error: Error occured</div>;
    }
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Button variant="outline" >
          <SelectProject projectData={projectData} />
        </Button>

        <Button>
          <CreateProject />
        </Button>



       <BusinessPlanProgress projectData={selectedProject} />

        

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-600">
              Online
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Your AI assistant is ready to help with your business plan. What would you like to work on today?
          </p>

          <div className="space-y-2 mb-4">
            <button className="w-full border border-blue-600 text-blue-600 py-2 px-3 rounded-lg text-sm hover:bg-blue-50">
              Complete my competitive analysis
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-2 px-3 rounded-lg text-sm hover:bg-blue-50">
              Generate financial projections
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-2 px-3 rounded-lg text-sm hover:bg-blue-50">
              Refine my marketing strategy
            </button>
          </div>

          <button
            onClick={handleNavigate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-indigo-700"
          >
            Chat with AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
