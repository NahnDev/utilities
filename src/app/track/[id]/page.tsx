"use client";

import TimeCounter from "@/modules/tracker/time-couter/TimeCounter";
import { useSetTrackTime, useTrackTime } from "@/store/time";
import { useParams } from "next/navigation";

export type TheTrackerPageProps = {};

const TheTrackerPage: React.FC<TheTrackerPageProps> = () => {
  const { id } = useParams();
  const time = useTrackTime(id);
  const setTime = useSetTrackTime(id);
  return (
    <div className="grid justify-center items-center size-full">
      <TimeCounter value={time} onChange={setTime} />
    </div>
  );
};

export default TheTrackerPage;
