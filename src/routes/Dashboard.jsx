import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const username = "johndoe11";

  return (
    <>
      <Sidebar username={username}></Sidebar>
      <main id="dashboard-content">
        <Outlet />
      </main>
    </>
  );
}
