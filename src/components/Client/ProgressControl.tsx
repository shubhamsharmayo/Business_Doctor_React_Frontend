import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Forward } from "lucide-react"
import { Button } from "../ui/button"


const ProgressControl = () => {
  return (
    <div>
        <Dialog>
  <DialogTrigger>
    <Forward/>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Your Progress</DialogTitle>
      

      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Please Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Not Started</SelectItem>
    <SelectItem value="dark">In Progress</SelectItem>
    <SelectItem value="system">Completed</SelectItem>
  </SelectContent>
</Select>

    </DialogHeader>
    <DialogFooter>
        <Button>Save Progress</Button>
    </DialogFooter>
    

  </DialogContent>
</Dialog>



    </div>
  )
}

export default ProgressControl