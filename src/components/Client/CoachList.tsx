import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
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
  Clock
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

const Button = ({ children, onClick, disabled, className = "", variant = "primary" }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow-md",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
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

export default function CoachList({ assignedCoach, coachData }: Props) {
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const { isLoaded, user } = useUser();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch(`${NEXT_BASE_URL}/api/coach`);
        const data = await res.json();
        setCoaches(data.users || []);
      } catch (err) {
        console.error("Failed to fetch coaches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  const foundId = coaches
    .flatMap((e) => e.clientIds)
    .find((id) => id === user?.id);
console.log(foundId)
  const handleSelectCoach = async (coachId: string) => {
    setSelectingId(coachId);
    try {
      // Step 1: Call your Next.js backend
      const nextRes = await fetch(`${NEXT_BASE_URL}/api/v1/select-coach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachId,
          clientId: user?.id,
        }),
      });

      const nextData = await nextRes.json();

      if (!nextRes.ok) {
        throw new Error(
          nextData.error || "Failed to select coach in Next.js backend"
        );
      }

      console.log("✅ Coach selected in Next backend:", nextData);

      // Step 2: Call your Node.js (Mongo) backend to assign coach
      const nodeRes = await fetch(`${NODE_API_BASE_URL}/user/assign-coach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachClerkId: coachId,
          clientClerkId: user?.id,
        }),
      });

      const nodeData = await nodeRes.json();

      if (!nodeRes.ok) {
        throw new Error(
          nodeData.message || "Failed to assign coach in Node backend"
        );
      }

      console.log("✅ Coach assigned in Node backend:", nodeData);

      // Optional: show a success message or redirect
    } catch (err) {
      console.error("Error selecting coach:", err);
    } finally {
      setSelectingId(null);
    }
  };

  const handleBookSession = async (coachUsername: string) => {
    if (!coachUsername) {
      console.error("Coach username is required");
      return;
    }
    // https://businessdoctor.vercel.app/${coachUsername} For Production
    const url = `${NEXT_BASE_URL}/${coachUsername}`;
    window.open(url, "_blank");
    // console.log(coachUsername)
  };

  // Loading state
  if (loading || !isLoaded) {
    return (
      <div className="my-6">
        <div className="mb-6">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-4"></div>
        </div>
        
        <div className="w-full overflow-x-auto">
          <div className="flex flex-nowrap gap-6 p-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="min-w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 animate-pulse">
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
            {assignedCoach ? "Your Assigned Coach" : "Choose Your Coach"}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-9">
          {assignedCoach 
            ? "Manage your coaching relationship and book sessions" 
            : "Select a professional coach to guide your journey"
          }
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex flex-nowrap gap-6 p-6">
          {/* Case 1: Coach already assigned */}
          {assignedCoach && coachData ? (
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
                      src={coachData.imageUrl || "/placeholder.jpg"}
                      alt={coachData.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {coachData.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">(4.9)</span>
                  </div>
                </div>

                {/* Coach Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Session Type</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {coachData.events?.[0]?.title || "General Coaching"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Industry</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {coachData.industry || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Award className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Experience</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {coachData.experience || "Not mentioned"}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleBookSession(coachData.username)}
                  className="w-full group"
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
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">(4.8)</span>
                    </div>
                  </div>

                  {/* Coach Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">Session Type</p>
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
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">Industry</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {coach.industry || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Award className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">Experience</p>
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
                    disabled={selectingId === coach.clerkUserId}
                    className="w-full group"
                  >
                    {selectingId === coach.clerkUserId ? (
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
          {foundId && (
            <div className="min-w-[700px]">
              <UpcomingEvents coaches={coaches} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}