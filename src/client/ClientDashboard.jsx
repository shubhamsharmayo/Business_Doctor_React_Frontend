import React from "react";
import { useNavigate } from "react-router";
import ProgressControl from "@/components/Client/ProgressControl.tsx";
import { Button } from "../components/ui/button";
import BusinessPlanProgress from "@/components/Client/BusinessPlanProgress.tsx";
import {fetchProjectData} from '@/lib/api/project-management.ts';

import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const mapStatusToPercent = (status) => {
  switch (status) {
    case "Completed":
      return 100;
    case "In Progress":
      return 50;
    case "Not Started":
      return 0;
    default:
      return 0;
  }
};

const mapStatusToColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500";
    case "In Progress":
      return "bg-blue-500";
    case "Not Started":
      return "bg-gray-300";
    default:
      return "bg-gray-300";
  }
};

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const clerkId = user?.id;

  const fetchProjectDataDetails = async () => {
    const { data } = await axios.get(`${fetchProjectData}/${clerkId}`);
    return data?.data;
  };

  const { data: projectData, isLoading, isError } = useQuery({
    queryKey: ["fetchProjectDataDetails", clerkId],
    queryFn: fetchProjectDataDetails,
    enabled: isLoaded && !!clerkId,
  });

  const handleNavigate = () => {
    navigate("/client/chat");
  };

  if (!isLoaded || isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load project data.</div>;
  }

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BusinessPlanProgress projectData={projectData} />

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
