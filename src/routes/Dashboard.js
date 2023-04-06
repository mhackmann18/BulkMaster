import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

export default function Import() {
  return (
    <>
      <Sidebar></Sidebar>
      <main id="dashboard-content">
        <Outlet />
      </main>
    </>
  );
}
