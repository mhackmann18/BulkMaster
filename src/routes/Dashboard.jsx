/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(deviceWidth <= 992);
  const username = "johndoe11";

  return (
    <div
      id="dashboard-page"
      className={sidebarCollapsed ? "sidebar-collapsed" : ""}
    >
      <Sidebar
        username={username}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main id="dashboard-page-content">
        <Outlet />
      </main>
    </div>
  );
}
