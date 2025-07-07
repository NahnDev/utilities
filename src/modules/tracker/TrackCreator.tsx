import { useState } from "react";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCreateTrack } from "@/store/track";

export type TrackCreatorProps = {};

const TrackCreator: React.FC<TrackCreatorProps> = () => {
  const createTrack = useCreateTrack();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    console.log("handleSubmit", name);
    setOpen(false);
    e.preventDefault();
    if (name.trim() === "") return;
    createTrack({ name });
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PlusCircle />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make a task!</DialogTitle>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-8">
            <Input placeholder="Name of task" onChange={(e) => setName(e.target.value)} value={name} />
            <Button type="submit" className="mt-4" variant="default">
              Create Task
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TrackCreator;
