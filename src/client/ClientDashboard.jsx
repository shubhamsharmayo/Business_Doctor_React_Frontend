

import React from "react";
import { useNavigate } from "react-router";
import ProgressControl from '@/components/Client/ProgressControl.tsx'
import { Button } from "../components/ui/button";
import BusinessPlanProgress from "@/components/Client/BusinessPlanProgress.tsx";

const progressItems = [
  { title: "Executive Summary", status: "Completed", percent: 100, color: "bg-green-500" },
  { title: "Market Analysis", status: "Completed", percent: 100, color: "bg-green-500" },
  { title: "Competitive Analysis", status: "In Progress", percent: 80, color: "bg-blue-500" },
  { title: "Marketing Strategy", status: "In Progress", percent: 50, color: "bg-blue-500" },
  { title: "Financial Projections", status: "Not Started", percent: 0, color: "bg-gray-300" },
  { title: "Implementation Timeline", status: "Not Started", percent: 0, color: "bg-gray-300" },
];

const ClientDashboard = () => {
  const navigate = useNavigate();

   const handleNavigate = () => {
    navigate("/client/chat");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Business Plan Progress */}
        <BusinessPlanProgress 
        progressItems={progressItems} />

        {/* Right: AI Assistant */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-600 ">
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



export default ClientDashboard

