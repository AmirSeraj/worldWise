import Sidebar from "./Sidebar";
import Map from "./Map";

export default function AppLayout() {
  return (
    <div className="w-full h-screen bg-slate-600 lg:flex-row flex-col flex">
      <Sidebar />
      <Map />
    </div>
  );
}
