/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../UserContextProvider";
import "./Dashboard.css";

export default function Dashboard() {
  const deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(deviceWidth <= 992);
  const userContext = useContext(UserContext);
  const { username } = userContext;

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
