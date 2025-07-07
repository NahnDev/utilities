import { TTrack } from "@/types/track";
import { DateTime } from "luxon";

export enum GroupType {
  DATE = "date",
}

export default function useGroup(items: TTrack[], groupBy: GroupType) {
  switch (groupBy) {
    case GroupType.DATE: {
      const grouped = items.reduce((acc, item) => {
        const date = item.createdAt / (1000 * 60 * 60 * 24);
        return {
          ...acc,
          [date]: [...(acc[date] ?? []), item],
        };
      }, {} as Record<number, TTrack[]>);
      return Object.keys(grouped)
        .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
        .map((key) => ({
          key,
          label: DateTime.fromMillis(Number(key) * 1000 * 60 * 60 * 24).toFormat("yyyy-MM-dd"),
          items: grouped[Number(key)],
        }));
    }
    default:
      return [];
  }
}
