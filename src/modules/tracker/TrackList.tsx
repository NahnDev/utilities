"use client";

import { SearchInput } from "@/components/input/search-input";
import { useTracks } from "@/store/track";
import { TTrack } from "@/types/track";
import TrackCreator from "./TrackCreator";
import TrackItem from "./TrackItem";
import useGroup, { GroupType } from "./hooks/useGroup";
import TrackGroup from "./TrackGroup";
import { useState } from "react";
import GroupBy from "./GroupBy";
import { Button } from "@/components/ui/button";
import { FilterIcon, TrashIcon } from "lucide-react";
import clsx from "clsx";
import { motion } from "motion/react";

export type TrackListProps = {
  value?: TTrack;
  onChangeValue?: (item: TTrack) => void;
};

export default function TrackList(props: TrackListProps) {
  const [search, setSearch] = useState("");
  const [groupBy, setGroupBy] = useState<GroupType>(GroupType.DATE);

  const items = useTracks();
  const filled = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase() || ""));
  const grouped = useGroup(filled, groupBy);

  return (
    <div className="grid bg-slate-50 border-r-2 border-slate-200 h-full overflow-hidden">
      <div className="grid grid-rows-[auto_1fr] w-80 h-full overflow-hidden">
        <header className="flex flex-col gap-2 p-4">
          <div className="flex flex-row items-center  gap-2">
            <TrackCreator />
            <SearchInput value={search} onChangeValue={setSearch} />
          </div>
          <div className={clsx("flex flex-row items-center gap-2 ", "justify-end", "duration-300")}>
            <GroupBy value={groupBy} onChangeValue={setGroupBy} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-2">
            {grouped.map(({ key, label, items }) => (
              <li key={key} className="flex flex-col gap-2">
                <TrackGroup label={label} />
                {items.map((item) => (
                  <TrackItem key={item.id} track={item} highlight={search} />
                ))}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
