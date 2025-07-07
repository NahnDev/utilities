import { useMemo } from "react";

export type TSegment = {
  text: string;
  match: boolean;
};

export default function useSegment(text: string, search?: string): TSegment[] {
  return useMemo(
    function () {
      if (!search) {
        return [{ text, match: false }];
      }
      const regex = new RegExp(`(${search})`, "gi");
      return text
        .split(regex)
        .reduce(
          (acc, part) => [...acc, { text: part, match: regex.test(part) }],
          [] as { text: string; match: boolean }[]
        );
    },
    [search, text]
  );
}
