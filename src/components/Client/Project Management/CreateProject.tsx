import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProjectApiUrl } from "@/lib/api/project-management";
import { showError, showSuccess } from "@/lib/toastUtils";



export const CreateProject = () => {
  const { userId } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // ✅ Controls dialog visibility

  const handleCreateProject = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(createProjectApiUrl, {
        project_name: projectName,
        clerk_id: userId,
      });
       showSuccess("Project created successfully!");

      console.log("✅ Project created:", response.data);

      // Clear inputs & close dialog
      setProjectName("");
      setOpen(false); // ✅ Close the dialog
    } catch (err) {
      showError("Something went wrong");
      console.error("❌ Error creating project:", err);
      setError("Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create a new project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Give your project a meaningful name. You can edit it later.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            onClick={handleCreateProject}
            disabled={isSubmitting || !projectName}
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
