// import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Briefcase,
  Award,
  Calendar,
  ChevronRight,
  Check,
  ExternalLink,
  Users,
  Star,
  Clock,
} from "lucide-react";
import UpcomingEvents from "./Project Management/UpcomingEvents";

import { NEXT_BASE_URL, NODE_API_BASE_URL } from "@/lib/api_base_url";

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
  name: string;
  imageUrl: string | null;
  industry: string | null;
  experience: string | null;
  events: Event[];
  clerkUserId: string;
  username: string;
  bookings: [];
  clientIds: string[];
};

type Props = {
  assignedCoach: string | null;
  coachData: Coach | null;
};

const Button = ({
  children,
  onClick,
  disabled,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow-md",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
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
  assignedCoach: initialAssignedCoach,
  coachData: initialCoachData,
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
  const hasAssignedCoach =  assignedCoachData|| initialAssignedCoach;
  const displayCoachData = assignedCoachData || initialCoachData;

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

      <div className="w-full overflow-x-auto">
        <div className="flex flex-nowrap gap-6 p-6">
          {/* Case 1: Coach already assigned */}
          {hasAssignedCoach && displayCoachData ? (
            <div className="min-w-[450px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Assigned Badge */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2">
                <div className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4" />
                  <span className="font-medium text-sm">Your Coach</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img
                      src={displayCoachData.imageUrl || "/placeholder.jpg"}
                      alt={displayCoachData.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {displayCoachData.name}
                  </h3>

                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      (4.9)
                    </span>
                  </div>
                </div>

                {/* Coach Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Session Type
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {displayCoachData.events?.[0]?.title ||
                          "General Coaching"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Industry
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {displayCoachData.industry || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Award className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Experience
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {displayCoachData.experience || "Not mentioned"}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleBookSession(displayCoachData.username)}
                  className="w-full group cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Session
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          ) : (
            /* Case 2: Coach selection */
            coaches.map((coach) => (
              <div
                key={coach.id}
                className="min-w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                      <img
                        src={coach.imageUrl || "/placeholder.jpg"}
                        alt={coach.name}
                        className="w-24 h-24 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {coach.name}
                    </h3>

                    <div className="flex items-center gap-1 text-amber-500 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        (4.8)
                      </span>
                    </div>
                  </div>

                  {/* Coach Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                          Session Type
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                          {coach.events[0]?.title || "General Coaching"}
                        </p>
                      </div>
                      {coach.events[0]?.duration && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {coach.events[0].duration}m
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                          Industry
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {coach.industry || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Award className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                          Experience
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {coach.experience || "Not mentioned"}
                        </p>
                      </div>
                    </div>

                    {/* Client count */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{coach.clientIds.length} active clients</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSelectCoach(coach.clerkUserId)}
                    disabled={selectCoachMutation.isPending}
                    className="w-full group"
                  >
                    {selectCoachMutation.isPending &&
                    selectCoachMutation.variables?.coachId ===
                      coach.clerkUserId ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Selecting...
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        Select Coach
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}

          {/* Upcoming events card */}
          {hasAssignedCoach && (
            <div className="min-w-[700px]">
              <UpcomingEvents coaches={coaches} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
