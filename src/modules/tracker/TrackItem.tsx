"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTrackTime } from "@/store/time";
import { TTrack } from "@/types/track";
import TimeUtils from "@/utils/time-utils";
import clsx from "clsx";
import { ChevronRight, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren, useMemo, useState } from "react";
import useSegment from "./hooks/useSegment";
import { useRemoveTrack } from "@/store/track";

export type TrackItemProps = PropsWithChildren<{
  track: TTrack;
  highlight?: string;
}>;
export default function TrackItem({ track, highlight, children }: TrackItemProps) {
  const router = useRouter();
  const checked = useParams().id === track.id;
  const trackTime = useTrackTime(track.id);
  const remove = useRemoveTrack(track.id);

  const trackTimeValue = useMemo(() => trackTime ?? { hours: 0, minutes: 0, seconds: 0 }, [trackTime]);
  const timeDesc = useMemo(() => TimeUtils.format(trackTimeValue), [trackTimeValue]);
  const segments = useSegment(track.name, highlight);

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    remove();
    if (checked) {
      router.push("/track");
    }
  };

  return (
    <Link href={`/track/${track.id}`} className="no-underline">
      <div
        className={clsx(
          "group",
          "flex flex-row items-center justify-between gap-4 p-2",
          checked && "bg-gray-100 border-l-2 border-teal-500"
        )}
      >
        <Checkbox checked={checked} />
        <div className="flex-1 flex flex-row justify-between items-center gap-4">
          <h3 className="text-base font-semibold">
            {segments.map((segment, index) => (
              <span
                key={index}
                className={clsx(segment.match ? "text-teal-500 font-bold" : "text-gray-800", "select-none")}
              >
                {segment.text}
              </span>
            ))}
          </h3>
          <div className="text-sm text-gray-500">
            <p>{timeDesc}</p>
          </div>
        </div>
        <div className="group-hover:opacity-100 opacity-0 duration-300">
          <Button variant="ghost" className="cursor-pointer" size="icon" onClick={handleRemove}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
