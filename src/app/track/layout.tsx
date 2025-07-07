import TrackList from "@/modules/tracker/TrackList";

export default function TrackerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="screen grid grid-cols-left">
      <TrackList />
      <div>{children}</div>
    </div>
  );
}
