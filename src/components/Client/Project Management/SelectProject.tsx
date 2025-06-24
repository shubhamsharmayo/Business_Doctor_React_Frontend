import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchUserAllProjects } from "@/lib/api/project-management";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useProjectStore } from "@/store/projectStore"; // ✅ import zustand store
import { useEffect } from "react";


interface ProjectData {
  _id: string;
  project_name: string;
  clerk_id: string;
  progress: Progress;
  business_plan_generated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Progress {
  market_analysis: ProgressStatus;
  competitive_analysis: ProgressStatus;
  marketing_strategy: ProgressStatus;
  financial_projection: ProgressStatus;
  business_plan_generation: ProgressStatus;
  implementation_timeline?: ProgressStatus;
  executive_summary?: ProgressStatus;
}

type ProgressStatus = "Not Started" | "In Progress" | "Completed";


const SelectProject = ({projectData}) => {

  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

 

  const handleProjectSelect = (project: ProjectData) => {
    
      setSelectedProject(project); 
      // ✅ update zustand selected project

      console.log("Project selected and saved:", project);
    
  };

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Select Projects</DropdownMenuTrigger>
      <DropdownMenuContent>
        {projectData?.map((project) => (
          <DropdownMenuItem
            key={project._id}
            onClick={() => handleProjectSelect(project)}
          >
            {project.project_name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectProject;
