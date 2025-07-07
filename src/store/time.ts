import { TTime } from "@/types/time";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TTimeStore = {
  map: { [key: string]: TTime };
  update: (id: string, time: TTime) => void;
};

export const useTimeStore = create<TTimeStore>()(
  persist(
    (set) => ({
      map: {},
      update: (id: string, time: TTime) => {
        set((state) => ({
          map: { ...state.map, [id]: time },
        }));
      },
    }),
    { name: "time-store" }
  )
);

export const useTrackTime = (id: string) => {
  return useTimeStore((state) => state.map[id]);
};

export const useSetTrackTime = (id: string) => {
  const update = useTimeStore((state) => state.update);

  return (time: TTime) => {
    update(id, time);
  };
};
