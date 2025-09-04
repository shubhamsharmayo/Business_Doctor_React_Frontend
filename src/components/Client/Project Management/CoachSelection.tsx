import {
  User,
  Briefcase,
  Award,
  Calendar,
  ChevronRight,
  Users,
  Star,
} from "lucide-react";

type CoachEvent = {
  id: string;
  title: string;
  duration: number;
};

type Coach = {
  id: string;
  name: string;
  imageUrl: string | null;
  industry: string | null;
  experience: string | null;
  events: CoachEvent[];
  clerkUserId: string;
  username: string;
  bookings: []; // can refine if you have a booking type
  clientIds: string[];
  bio: string;
};

type CoachSelectionProps = {
  coaches: Coach[]; // ✅ fixed: must be an array
  handleSelectCoach: (coachId: string) => void;
  selectCoachMutation: {
    isPending: boolean;
    variables?: { coachId: string };
  };
  dataDisplayAmount: number | null;
};

// Button Component
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

// CoachSelection Component
const CoachSelection = ({
  coaches,
  handleSelectCoach,
  selectCoachMutation,
  dataDisplayAmount,
}: CoachSelectionProps) => {
  const displayedCoaches =
    dataDisplayAmount !== null ? coaches.slice(0, dataDisplayAmount) : coaches;

  return (
    <div className="flex flex-wrap gap-8">
      {displayedCoaches.map((coach) => (
        <div
          key={coach.id}
          className="min-w-[400px] bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group "
        >
          <div className="p-6">
            {/* Coach Avatar & Name */}
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
                    BIO
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                    {coach.bio?.length > 20
                      ? coach.bio.slice(0, 20) + "..."
                      : coach.bio || "General Coaching"}
                  </p>
                </div>
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

            {/* Select Button */}
            <Button
              onClick={() => handleSelectCoach(coach.clerkUserId)}
              disabled={selectCoachMutation.isPending}
              className="w-full group"
            >
              {selectCoachMutation.isPending &&
              selectCoachMutation.variables?.coachId === coach.clerkUserId ? (
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
      ))}
    </div>
  );
};

export default CoachSelection;
