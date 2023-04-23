import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [contentMarginLeft, setContentMarginLeft] = useState(0);
  const username = "johndoe11";

  return (
    <div id="dashboard-page">
      <Sidebar
        username={username}
        onCollapse={(elementWidth) => setContentMarginLeft(elementWidth)}
      />
      <main
        id="dashboard-page-content"
        style={{ marginLeft: contentMarginLeft }}
      >
        <Outlet />
      </main>
    </div>
  );
}
