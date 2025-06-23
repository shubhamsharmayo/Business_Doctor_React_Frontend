import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchUserAllProjects } from "@/lib/api/project-management";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import db from "@/db/dexieDB.js"; // Adjust path as per your project structure

const SelectProject = () => {
  const { user } = useUser();
  const clerkId = user?.id;

  // Fetch function
  const UserAllProjects = async () => {
    const { data } = await axios.get(`${fetchUserAllProjects}/${clerkId}`);
    return data?.data;
  };

  // Query for projects
  const {
    data: projectData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchProjectDataDetails", clerkId],
    queryFn: UserAllProjects,
    enabled: !!clerkId,
  });

  const handleProjectSelect = async (project) => {
    try {
      
      await db.selected_project.clear(); // optional: if you want to keep only 1
      await db.selected_project.put(project);

      console.log("Project selected:", project);
    } catch (error) {
      console.error("Error selecting project:", error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default SelectProject;
