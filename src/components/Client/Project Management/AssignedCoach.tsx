import {
  Briefcase,
  Award,
  Calendar,
  Check,
  ExternalLink,
  Star,
} from "lucide-react";

interface displayCoachData {
  id: string;
  clerkUserId: string;
  email: string;
  username: string;
  name: string;
  role: string; // literal type, since role looks fixed here
  imageUrl: string | null;
  clientIds: string[];
  industry: string | null;
  bio: string;
  experience: string | null;
  isOnboarded: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

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

const AssignedCoach = ({
  displayCoachData,
  handleBookSession,
  isLoading,
}: {
  displayCoachData?: displayCoachData;
  handleBookSession: (username: string) => void;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">Loading coach...</p>
      </div>
    );
  }

  if (!displayCoachData) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          No coach assigned yet
        </p>
      </div>
    );
  }

  console.log(displayCoachData);

  return (
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
                BIO
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {displayCoachData.bio?.length > 20
                  ? displayCoachData.bio.slice(0, 20) + "..."
                  : displayCoachData.bio || "General Coaching"}
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
  );
};

export default AssignedCoach;
