import clsx from "clsx";
import { Plus, PlusIcon } from "lucide-react";
import { useState } from "react";
import Dialog from "../../components/Dialog";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTrackStore } from "../../store/track";
import { v4 as uuidV4 } from "uuid";

export type TrackCreatorProps = {};

const TrackCreator: React.FC<TrackCreatorProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");

  const createTrack = useTrackStore((state) => state.updateTrack);

  const handleSubmit = () => {
    if (name.trim() !== "") {
      const id = uuidV4();
      createTrack(id, { id, name });
    }
    setExpanded(false);
    setName("");
  };
  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        <PlusIcon></PlusIcon>
      </button>
      <Dialog open={expanded} title="Create New Track" onClose={() => setExpanded(false)}>
        <form className={clsx("flex flex-col gap-4", expanded ? "block" : "hidden")} onSubmit={handleSubmit}>
          <Input
            autoFocus
            value={name}
            onChangeText={setName}
            label="Track Name"
            placeholder="Enter track name"
            className="w-full"
          ></Input>
          <Button className="mt-4" type="submit" disabled={name.trim() === ""}>
            Create Track
          </Button>
        </form>
      </Dialog>
    </div>
  );
};

export default TrackCreator;
