import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { NEXT_BASE_URL } from "@/lib/api_base_url";
import { useUser } from "@clerk/clerk-react";
import CoachList from "@/components/Client/CoachList";
import PlanComparisonCard from "@/components/Client/Project Management/PlanComparisonCard";
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

const Coaches = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  // const [assignedCoach, setAssignedCoach] = useState<assignCoach | null>(null);
  const [coachData, setCoachData] = useState<Coach | null>(null);
  const { userData, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user?.id) return;
    fetchUser(user?.id)

    const fetchUserAndCoach = async () => {
      setIsLoading(true);
      try {
        // const res = await fetch(
        //   `${NODE_API_BASE_URL}/user/find-user/${user.id}`
        // );
        // const data = await res.json();
        // console.log(data);

        if (userData?.coachId) {
          // setAssignedCoach(data.coachId);

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
  }, [user?.id]);

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

  return (
    <div className="mt-15 ">
      {user?.publicMetadata?.plan === "pro" && (
        <div className="ml-10">
          <CoachList
            // assignedCoach={assignedCoach}
            coachData={coachData}
            dataDisplayAmount={null}
          />
        </div>
      )}
      {user?.publicMetadata?.plan === "basic" && (
        <div className="mt-8">
          <PlanComparisonCard />
        </div>
      )}
    </div>
  );
};

export default Coaches;
