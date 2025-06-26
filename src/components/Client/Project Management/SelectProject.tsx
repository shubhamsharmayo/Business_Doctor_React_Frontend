import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useProjectStore } from "@/store/projectStore"; // ✅ import zustand store
import type { ProjectData } from "@/types/project.types";

interface SelectProjectProps {
  projectData: ProjectData[];
}

const SelectProject = ({projectData}:SelectProjectProps) => {
console.log("projectData", projectData)

  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

 

  const handleProjectSelect = (project:ProjectData) => {
    console.log("project", project)
      setSelectedProject(project); 
      // ✅ update zustand selected project
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
