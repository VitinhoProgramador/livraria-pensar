import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
