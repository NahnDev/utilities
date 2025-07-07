export type TimeSlotProps = {
  label: string;
  value: number;
};

export default function TimeSlot(props: TimeSlotProps) {
  const str = props.value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <h1 className="text-xs text-slate-500 uppercase">{props.label}</h1>
      <p className="text-8xl font-bold text-slate-700">{str}</p>
    </div>
  );
}
