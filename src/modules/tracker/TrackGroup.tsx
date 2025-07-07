"use client";

export type TrackGroupProps = {
  label: string;
};

const TrackGroup: React.FC<TrackGroupProps> = ({ label }) => {
  return (
    <div className="flex flex-row justify-between items-center gap-2 p-2">
      <div className="w-2 h-[1px] bg-slate-500/50"></div>
      <h2 className="text-sm text-slate-500 font-semibold select-none">{label}</h2>
      <div className="flex-1 h-[1px] bg-slate-500/50"></div>
    </div>
  );
};

export default TrackGroup;
