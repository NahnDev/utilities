import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GroupType } from "./hooks/useGroup";

export type GroupByProps = {
  value?: GroupType;
  onChangeValue?: (value: GroupType) => void;
};

export default function GroupBy(props: GroupByProps) {
  const { value, onChangeValue } = props;
  return (
    <div className="text-xs flex flex-row gap-2 items-center">
      <Select value={value} onValueChange={onChangeValue}>
        <span>Group by:</span>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={GroupType.DATE}>Created date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
