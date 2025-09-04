import BusinessPlanProgress from "@/components/Client/BusinessPlanProgress";
import SelectProject from "@/components/Client/Project Management/SelectProject";
import { CreateProject } from "@/components/Client/Project Management/CreateProject";
import { useProjectStore } from "@/store/projectStore";
import type { ProjectData } from "@/types/project.types";
import CoachList from "@/components/Client/CoachList";
import { useEffect, useState } from "react";
import { NEXT_BASE_URL } from "@/lib/api_base_url";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProUpgradeBanner from "@/components/Client/Project Management/ProUpgradebanner";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

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

type assignCoach = {
  _id: string;
  clerkId: string;
  name: string | null;
  email: string;
  role: "client" | "coach" | "admin"; // extend if you have more roles
  isPurchased: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  plan: "basic" | "pro" | "enterprise"; // adjust based on your plans
  coachId?: string; // optional if some users don't have a coach
};

const ClientDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const projects = useProjectStore((state) => state.projects);
  const [assignedCoach, setAssignedCoach] = useState<assignCoach | null>(null);
  const [coachData, setCoachData] = useState<Coach | null>(null);
  const { userData, fetchUser } = useUserStore();

  // console.log("coachData", coachData);

  useEffect(() => {
    if (!user?.id) return;
    fetchUser(user?.id);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchUserAndCoach = async () => {
      setIsLoading(true);
      try {
        // const res = await fetch(
        //   `${NODE_API_BASE_URL}/user/find-user/${user.id}`
        // );
        // const data = await res.json();
        // console.log(data);

        if (userData?.coachId) {
          setAssignedCoach(userData);

          const coachRes = await fetch(
            `${NEXT_BASE_URL}/api/v1/get-coach-by-id`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ coachId: userData.coachId }),
            }
          );

          if (coachRes.ok) {
            const coachData = await coachRes.json();
            setCoachData(coachData.coach);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user or coach:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndCoach();
  }, [user?.id, userData?.coachId]);

  console.log(userData);
  console.log(assignedCoach);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-8 h-8 rounded-full mr-2" />
        <span>Loading user data...</span>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 w-full max-w-md p-6">
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    );
  // console.log(isLoading)
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Coach Section */}
      {user?.publicMetadata?.plan === "basic" && (
        <div className="mt-8">
          <ProUpgradeBanner />
        </div>
      )}
      {user?.publicMetadata?.plan === "pro" && (
        <section className="mb-8">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">No coach assigned yet</p>
            </div>
          ) : (
            <div className="flex flex-wrap h-full mt-5">
              <CoachList
                // assignedCoach={assignedCoach}
                coachData={coachData}
                dataDisplayAmount={2}
              />
              <div className="  ml-21 p-6 ">
                {!isLoading && !assignedCoach?.coachId ? (
                  <div className="flex items-center justify-center ">
                    <Link
                      to="/client/coach"
                      className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl dark:shadow-gray-500 active:scale-95"
                    >
                      View All
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Project Management Section */}
      <section className="mt-15">
        <div className=" flex justify-around gap-4 mb-6">
          <SelectProject projectData={projects} />

          <CreateProject />
        </div>

        {!selectedProject ? (
          <div className="bg-blue-50 text-blue-800 text-center rounded-lg p-4 mb-6">
            Please select a project to continue
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BusinessPlanProgress
              projectData={selectedProject as ProjectData}
            />

            {/* AI Assistant Card */}
            <div className="bg-white rounded-xl dark:bg-gray-700 shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl dark:text-white font-semibold text-gray-800">
                    AI Assistant
                  </h2>
                  <span className="inline-flex dark:text-green items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  Your AI assistant is ready to help with your business plan.
                  What would you like to work on today?
                </p>

                <div className="space-y-3 mb-6">
                  <button className="w-full text-left p-3 border border-blue-200 rounded-lg hover:bg-blue-50 dark:hover:text-black transition-colors">
                    Complete my competitive analysis
                  </button>
                  <button className="w-full text-left p-3 border border-blue-200 rounded-lg hover:bg-blue-50 dark:hover:text-black transition-colors">
                    Generate financial projections
                  </button>
                  <button className="w-full text-left p-3 border border-blue-200 rounded-lg hover:bg-blue-50 dark:hover:text-black transition-colors">
                    Refine my marketing strategy
                  </button>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Chat with AI Assistant
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ClientDashboard;
