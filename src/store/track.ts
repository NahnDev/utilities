import { TTrack } from "@/types/track";
import { useCallback } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidV4 } from "uuid";
import { useParams } from "next/navigation";

export type TTrackStore = {
  map: { [key: string]: TTrack };
  update: (id: string, track: TTrack) => void;
  create: (track: Pick<TTrack, "name">) => void;
  remove: (id: string) => void;
};

export const useTrackStore = create<TTrackStore>()(
  persist(
    (set) => ({
      map: {},
      update: (id: string, track: TTrack) => {
        set((state) => {
          const newMap = { ...state.map };
          newMap[id] = track;
          return { map: newMap };
        });
      },
      create: (track: Pick<TTrack, "name">) => {
        set((state) => {
          const id = uuidV4();
          const newTrack: TTrack = { id, name: track.name, createdAt: Date.now() };
          return { map: { ...state.map, [id]: newTrack } };
        });
      },
      remove: (id: string) => {
        set((state) => {
          const newMap = { ...state.map };
          delete newMap[id];
          return { map: newMap };
        });
      },
    }),
    { name: "track-store" }
  )
);

// hooks

export const useTrack = (id: string) => {
  const trackStore = useTrackStore((state) => state.map[id]);
};

export const useSetTrack = (id: string) => {
  const update = useTrackStore((state) => state.update);

  return useCallback(
    (track: TTrack) => {
      update(id, track);
    },
    [id, update]
  );
};

export const useRemoveTrack = (id: string) => {
  const remove = useTrackStore((state) => state.remove);
  return useCallback(() => {
    remove(id);
  }, [id, remove]);
};

export const useCreateTrack = () => {
  const create = useTrackStore((state) => state.create);
  return useCallback(
    (track: Pick<TTrack, "name">) => {
      create(track);
    },
    [create]
  );
};

export const useTracks = () => {
  const map = useTrackStore((state) => state.map);
  return Object.values(map);
};
