// import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import UpcomingEvents from "./Project Management/UpcomingEvents";
import { Users } from "lucide-react";

import { NEXT_BASE_URL, NODE_API_BASE_URL } from "@/lib/api_base_url";
import AssignedCoach from "./Project Management/AssignedCoach";
import CoachSelection from "./Project Management/CoachSelection";

type Event = {
  id: string;
  title: string;
  description: string;
  duration: number;
  userId: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

type Coach = {
  id: string;
  clerkUserId: string;
  email: string;
  username: string;
  name: string;
  role: string;
  imageUrl: string | null;
  industry: string | null;
  experience: string | null;
  events: Event[];
  bookings: [];
  clientIds: string[];
  bio: string;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;

  
};

// type assignCoach = {
//   _id: string;
//   clerkId: string;
//   name: string | null;
//   email: string;
//   role: "client" | "coach" | "admin"; // extend if you have more roles
//   isPurchased: boolean;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   __v: number;
//   plan: "basic" | "pro" | "enterprise"; // adjust based on your plans
//   coachId?: string; // optional if some users don't have a coach
// };

type Props = {
  // assignedCoach: assignCoach | null;
  coachData: Coach | null;
  dataDisplayAmount : number | null
};

// API functions
const fetchCoaches = async (): Promise<Coach[]> => {
  const res = await fetch(`${NEXT_BASE_URL}/api/coach`);
  if (!res.ok) {
    throw new Error("Failed to fetch coaches");
  }
  const data = await res.json();
  return data.users || [];
};

const fetchAssignedCoach = async (
  userId: string | undefined
): Promise<Coach | null> => {
  if (!userId) return null;

  const res = await fetch(`${NEXT_BASE_URL}/api/assigned-coach/${userId}`);
  if (!res.ok) {
    if (res.status === 404) return null; // No assigned coach
    throw new Error("Failed to fetch assigned coach");
  }
  const data = await res.json();
  return data.coach || null;
};

const selectCoach = async ({
  coachId,
  clientId,
}: {
  coachId: string;
  clientId: string | undefined;
}) => {
  if (!clientId) throw new Error("User ID is required");

  // Step 1: Call Next.js backend
  const nextRes = await fetch(`${NEXT_BASE_URL}/api/v1/select-coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coachId, clientId }),
  });

  const nextData = await nextRes.json();
  if (!nextRes.ok) {
    throw new Error(
      nextData.error || "Failed to select coach in Next.js backend"
    );
  }

  // Step 2: Call Node.js backend
  const nodeRes = await fetch(`${NODE_API_BASE_URL}/user/assign-coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coachClerkId: coachId, clientClerkId: clientId }),
  });

  const nodeData = await nodeRes.json();
  if (!nodeRes.ok) {
    throw new Error(
      nodeData.message || "Failed to assign coach in Node backend"
    );
  }

  return nodeData;
};

export default function CoachList({
  // assignedCoach: initialAssignedCoach,
  coachData: initialCoachData,
  dataDisplayAmount
}: Props) {
  const { isLoaded, user } = useUser();
  const queryClient = useQueryClient();

  // Fetch all coaches
  const { data: coaches = [], isLoading: coachesLoading } = useQuery({
    queryKey: ["coaches"],
    queryFn: fetchCoaches,
    enabled: isLoaded,
  });

  // Fetch assigned coach data
  const { data: assignedCoachData, isLoading: assignedCoachLoading } = useQuery(
    {
      queryKey: ["assignedCoach", user?.id],
      queryFn: () => fetchAssignedCoach(user?.id),
      enabled: isLoaded && !!user?.id,
      initialData: initialCoachData,
    }
  );

  // Determine if user has an assigned coach
  const hasAssignedCoach = assignedCoachData || initialCoachData;
  const displayCoachData = assignedCoachData || initialCoachData;
// console.log(hasAssignedCoach)
  // Coach selection mutation
  const selectCoachMutation = useMutation({
    mutationFn: selectCoach,
    onSuccess: (data, variables) => {
      // Find the selected coach from the coaches list
      const selectedCoach = coaches.find(
        (coach) => coach.clerkUserId === variables.coachId
      );

      // Update the assigned coach cache
      queryClient.setQueryData(["assignedCoach", user?.id], selectedCoach);

      // Optionally show success message
      console.log("✅ Coach selection successful:", data);
    },
    onError: (error) => {
      console.error("Error selecting coach:", error);
      // You can add toast notification here
    },
  });

  const handleSelectCoach = (coachId: string) => {
    selectCoachMutation.mutate({ coachId, clientId: user?.id });
  };

  const handleBookSession = async (coachUsername: string) => {
    if (!coachUsername) {
      console.error("Coach username is required");
      return;
    }
    const url = `${NEXT_BASE_URL}/${coachUsername}`;
    window.open(url, "_blank");
  };
  // console.log(displayCoachData);
  // console.log( coaches)
  // Loading state
  if (coachesLoading || assignedCoachLoading || !isLoaded) {
    return (
      <div className="my-6">
        <div className="mb-6">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-4"></div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="flex flex-nowrap gap-6 p-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="min-w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 animate-pulse"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="space-y-2 text-center w-full">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-36 mx-auto"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28 mx-auto"></div>
                  </div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {hasAssignedCoach ? "Your Assigned Coach" : "Choose Your Coach"}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-9">
          {hasAssignedCoach
            ? "Manage your coaching relationship and book sessions"
            : "Select a professional coach to guide your journey"}
        </p>
      </div>

      <div className="w-full flex gap-6">
        <div className="flex flex-wrap gap-6 pl-6">
          {/* Case 1: Coach already assigned */}
          {hasAssignedCoach && displayCoachData ? (
            <AssignedCoach
              displayCoachData={displayCoachData}
              handleBookSession={handleBookSession}
            />
          ) : (
            /* Case 2: Coach selection */
            <CoachSelection
              coaches={coaches}
              handleSelectCoach={handleSelectCoach}
              selectCoachMutation={selectCoachMutation}
              dataDisplayAmount={dataDisplayAmount}
            />
          )}
       </div>
        {/* Upcoming events card */}
        {hasAssignedCoach && (
          <div className="min-w-[700px]">
            <UpcomingEvents coaches={coaches} />
          </div>
        )} 
        
      </div>
    </div>
  );
}
