import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import { PlayCircle, Square } from "lucide-react";
import clsx from "clsx";
import { TTime } from "@/types/time";

export type TimeCounterProps = {
  value?: TTime;
  onChange?: (value: TTime) => void;
};

export default function TimeCounter(props: TimeCounterProps) {
  const [start, setStart] = useState(false);
  const { value = { hours: 0, minutes: 0, seconds: 0 } } = props;
  const isNoValue = !value || (value.hours === 0 && value.minutes === 0 && value.seconds === 0);
  useEffect(() => {
    if (!start) return;
    const timeout = setTimeout(() => {
      const seconds = value.seconds + 1;
      const minutes = value.minutes + Math.floor(seconds / 60);
      const hours = value.hours + Math.floor(minutes / 60);
      props.onChange?.({
        hours: hours,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [value.hours, value.minutes, value.seconds, start]);

  return (
    <div className="size-full flex flex-row relative">
      <div className="flex-1" />
      <div className="z-10 my-auto duration-1000">
        <div className="grid grid-cols-3 gap-10">
          <TimeSlot label="Hours" value={value.hours} />
          <TimeSlot label="Minutes" value={value.minutes} />
          <TimeSlot label="Seconds" value={value.seconds} />
        </div>
        <div className={clsx("flex flex-row justify-center items-center gap-4 mt-10")}>
          {start ? (
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => setStart(false)}>
              <Square className="size-4" />
              <span className="text-xs">Pause</span>
            </Button>
          ) : isNoValue ? (
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setStart(true)}>
              <PlayCircle className="size-4" />
              <span className="text-xs">Start</span>
            </Button>
          ) : (
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setStart(true)}>
              <PlayCircle className="size-4" />
              <span className="text-xs">Continues</span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1" />
    </div>
  );
}

function Button(props: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      className={clsx(
        "flex flex-row gap-2 items-center justify-center",
        " p-2 px-4 cursor-pointer rounded-md",
        "text-white font-bold",
        "hover:scale-105 hover:shadow-lg",
        "transition-all duration-300",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
