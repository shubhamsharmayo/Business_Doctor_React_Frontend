

import { Button } from "../components/ui/button";
import BusinessPlanProgress from "@/components/Client/BusinessPlanProgress.tsx";


import SelectProject from '@/components/Client/Project Management/SelectProject.tsx';
import axios from "axios";

import {CreateProject} from '@/components/Client/Project Management/CreateProject.tsx';

import { useProjectStore } from "@/store/projectStore";
import type { ProjectData } from "@/types/project.types";
import CoachList from "@/components/Client/CoachList";
import { useEffect, useState } from "react";
import { NODE_API_BASE_URL,NEXT_BASE_URL } from "@/lib/api_base_url";

import { useUser } from "@clerk/clerk-react";


const ClientDashboard = () => {

  const {isLoaded,user}=useUser();

  const selectedProject = useProjectStore((state) => state.selectedProject);
  const projects = useProjectStore((state) => state.projects);
  
   const [assignedCoach, setAssignedCoach] = useState<string | null>(null); //it will find assigned coach id
  
  const [coachData, setCoachData] = useState<any>(null); // it will fetch full coach info

  useEffect(() => {
  if (!user?.id) return;

  const fetchUserAndCoach = async () => {
    try {
      const res = await fetch(`${NODE_API_BASE_URL}/user/find-user/${user.id}`);
      const data = await res.json();

      if (data?.coachId) {
        setAssignedCoach(data.coachId);

        // fetch coach details
        const coachRes = await axios.post(`${NEXT_BASE_URL}/api/v1/get-coach-by-id`, {
          coachId: data.coachId,
        });

        if (coachRes?.data) {
          setCoachData(coachRes.data.coach);
          console.log("coachRes",coachRes.data.coach)
        }
      }
    } catch (err) {
      console.error("Failed to fetch user or coach:", err);
    }
  };

  fetchUserAndCoach();
}, [user?.id]);

  if(!isLoaded) return <div>Loading user...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <CoachList assignedCoach={assignedCoach} coachData={coachData}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
        <Button variant="outline" >
          <SelectProject projectData={projects} />
        </Button>
        <Button>
          <CreateProject />
        </Button>

        {!selectedProject ? 
        <div className="text-center text-sm bg-violet-400 text-semibold rounded-xl px-4 py-2">Please select a project to continue </div>
        :
        (

          <>
           

       <BusinessPlanProgress projectData={selectedProject as ProjectData} />

        
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
            // onClick={handleNavigate}
            className="w-full cursor-default bg-indigo-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-indigo-700"
          >
            Chat with AI Assistant
          </button>
        </div></>

        )
      }
        

       
      </div>
    </div>
  );
};

export default ClientDashboard;
