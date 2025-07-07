import React, { PropsWithChildren, useMemo } from "react";
import { DateTime } from "luxon";

export type DateGroupProps = PropsWithChildren<{
  date: Date;
}>;

export default function DateGroup(props: DateGroupProps) {
  const dateStr = useMemo(() => DateTime.fromJSDate(props.date).toFormat("dd LLL yyyy"), [props.date]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{dateStr}</h2>
      <div className="space-y-4">{props.children}</div>
    </div>
  );
}
