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

  // Save fetched projects to Dexie
  useEffect(() => {
    const saveToDexie = async () => {
      if (projectData?.length) {
        try {
          await db.projects.bulkPut(projectData); // Safe insert/update
          console.log("Project data saved to Dexie");
        } catch (error) {
          console.error("Error saving to Dexie:", error);
        }
      }
    };
    saveToDexie();
  }, [projectData]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Select Projects</DropdownMenuTrigger>
        <DropdownMenuContent>
      
          {projectData?.map((project) => (
            <DropdownMenuItem key={project._id}>
              {project.project_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectProject;
