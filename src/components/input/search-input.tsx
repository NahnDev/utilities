import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export type SearchInputProps = {
  value?: string;
  onChangeValue?: (value: string) => void;
};

export function SearchInput(props: SearchInputProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <Input
        value={props.value}
        onChange={(e) => props.onChangeValue?.(e.target.value)}
        type="search"
        placeholder="Search ..."
      />
    </div>
  );
}
