import { Button } from '../ui/button';
import ProgressControl from './ProgressControl';
import { useNavigate } from 'react-router';

// Define the progress status type
type ProgressStatus = "Not Started" | "In Progress" | "Completed";

// Define the progress object type
interface Progress {
  market_analysis: ProgressStatus;
  competitive_analysis: ProgressStatus;
  marketing_strategy: ProgressStatus;
  financial_projection: ProgressStatus;
  implementation_timeline?: ProgressStatus; // optional in case it's missing
  business_plan_generation: ProgressStatus;
  executive_summary?: ProgressStatus;
}

// Define the main project data type
interface ProjectData {
  progress: Progress;
  _id: string;
  project_name: string;
  clerk_id: string;
  business_plan_generated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define props for your BusinessPlanProgress component
interface BusinessPlanProgressProps {
  projectData: ProjectData;
}

// Define the type for progress items in your component
interface ProgressItem {
  title: string;
  status: ProgressStatus;
  percent: number;
  color: string;
}

const mapStatusToPercent = (status: ProgressStatus) => {
  switch (status) {
    case "Completed": return 100;
    case "In Progress": return 50;
    case "Not Started": return 0;
    default: return 0;
  }
};

const mapStatusToColor = (status: ProgressStatus) => {
  switch (status) {
    case "Completed": return "bg-green-500";
    case "In Progress": return "bg-blue-500";
    case "Not Started": return "bg-gray-300";
    default: return "bg-gray-300";
  }
};

const BusinessPlanProgress: React.FC<BusinessPlanProgressProps> = ({ projectData }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/client/chat");

  if (!projectData || !projectData.progress) return null;

  const progress = projectData.progress;

  const progressItems: ProgressItem[] = Object.entries(progress).map(([key, value]) => ({
    title: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    status: value,
    percent: mapStatusToPercent(value),
    color: mapStatusToColor(value),
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Business Plan Progress</h2>
      </div>

      {progressItems.map((item, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{item.title}</span>
            <span className={
              item.status === "Completed" ? "text-green-600" :
              item.status === "In Progress" ? "text-blue-500" :
              "text-gray-500"
            }>
              {item.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
            </div>
            <Button variant="outline">
              <ProgressControl />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
          onClick={handleNavigate}
        >
          Continue with AI
        </button>
      </div>
    </div>
  );
};

export default BusinessPlanProgress;
