import { Eye, MessageCircleCode } from 'lucide-react';
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
  implementation_timeline?: ProgressStatus;
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

// Props
interface BusinessPlanProgressProps {
  projectData: ProjectData;
}

// For UI rendering
interface ProgressItem {
  key: string; // real progress field key
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
  const handleNavigate = (title) => navigate(`/client/chat/${title}`);


  if (!projectData || !projectData.progress) return null;

  const progressItems: ProgressItem[] = Object.entries(projectData.progress).map(
    ([key, status]) => ({
      key, // actual progress field name like "market_analysis"
      title: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      status,
      percent: mapStatusToPercent(status),
      color: mapStatusToColor(status),
    })
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Business Plan Progress: {projectData.project_name}  </h2>
      </div>

      {progressItems.map((item, i) => (
        <div key={i} className="mb-4">
          <div className="flex  text-sm mb-1">
            <span>{item.title} {" -"} </span>
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
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>

            
              {/* ✅ Pass correct data here */}
              <ProgressControl
                progressItem={item.key} // pass real progress field name
                projectId={projectData._id}
                projectName={projectData.project_name}
              />

              <Button
              onClick={()=>handleNavigate(item.key)}
              className='cursor-pointer'
              > <MessageCircleCode/> </Button>
            
          </div>
        </div>
      ))}

      
    </div>
    
  );
};

export default BusinessPlanProgress;
