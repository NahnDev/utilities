import TimeUtils from "../../utils/time";
import { TTrack, TTrackTime } from "../../types/track";
import React, { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { useTrackTime } from "../../store/time";

export type TrackItemProps = {
  track: TTrack;
  onFocus: () => void;
};
export default function TrackItem({ track, onFocus }: TrackItemProps) {
  const [time] = useTrackTime(track.id);
  const timeStr = useMemo(() => TimeUtils.format(time?.take || { hours: 0, minutes: 0, seconds: 0 }), [time]);

  return (
    <div>
      <h3 className="text-lg font-semibold">{track.name}</h3>
      <div className="text-sm text-gray-600">
        <p>Take: {timeStr}</p>
      </div>
      <button className="text-blue-500 hover:underline" onClick={onFocus}>
        <ChevronRight />
      </button>
    </div>
  );
}
