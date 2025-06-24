import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Forward } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { updateProgressStatus } from "@/lib/api/project-management"; // assumes you exported the base URL string
import { useQueryClient } from "@tanstack/react-query";

const ProgressControl = ({ projectName, progressItem, projectId }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
   const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const handleUpdate = async () => {
    if (!selectedStatus) {
      alert("Please select a status first");
      return;
    }

    try {
      const url = updateProgressStatus.replace(":projectId", projectId);

      const payload = {
        [progressItem]: selectedStatus,
         // ✅ dynamic key
      };

      const response = await axios.patch(url, payload);
      // ✅ Invalidate the query to refetch updated data
      queryClient.invalidateQueries(["fetchProjectDataDetails"]);

      console.log("✅ Progress updated:", response.data);
    } catch (error) {
      console.error("❌ Failed to update progress:", error);
    }

    setOpen(false);
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            console.log("Opening dialog for:", progressItem);
            console.log("Project ID:", projectId);
          }}
        >
          <Forward />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Progress for {projectName}</DialogTitle>
          <DialogDescription>
            Set the current status for:{" "}
            <strong>{progressItem.replace(/_/g, " ")}</strong>
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button onClick={handleUpdate}>Save Progress</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressControl;
