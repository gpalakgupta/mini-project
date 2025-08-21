import DoctorList from "../components/DoctorList";

export default function Home() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <DoctorList />
    </div>
  );
}
