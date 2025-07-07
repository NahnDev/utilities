import React, { useState } from "react";
import AppSearch from "../../components/AppSearch";
import { useTrackStore } from "../../store/track";
import TrackItem from "./TrackItem";
import TrackCreator from "../track-creator/TrackCreator";
import { useQueryParam } from "../../hooks/useQueryParam";
import { TTrack } from "../../types/track";

export type TrackListProps = {
  value?: TTrack;
  onChangeValue?: (item: TTrack) => void;
};

export default function TrackList(props: TrackListProps) {
  const items = useTrackStore((state) => state.tracks);
  return (
    <div className="grid grid-rows-[auto_1fr] w-full h-full overflow-hidden">
      <header className="flex flex-row items-center gap-4 p-4">
        <div className="flex-1">
          <AppSearch />
          <TrackCreator />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        {Object.keys(items).length > 0 ? (
          <ul className="flex flex-col gap-2 p-4">
            {Object.values(items).map((item) => (
              <li key={item.id} className="p-2 border rounded-md">
                <TrackItem track={item} onFocus={() => props.onChangeValue && props.onChangeValue(item)} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">No tracks available. Please create a new track.</div>
        )}
      </main>
    </div>
  );
}
