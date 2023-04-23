/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const [contentMarginLeft, setContentMarginLeft] = useState(1000);
  const username = "johndoe11";

  function handleCollapse(elementWidth) {
    const deviceWidth =
      window.innerWidth > 0 ? window.innerWidth : screen.width;

    // For viewport widths less than 992, the content's left margin shouldn't update
    // when the Sidebar is expanded. The expanded sidebar will instead overlap the
    // contentelementWidth < contentMarginLeft ensures that only the lesser Sidebar
    // width (The collapsed width) is used to calculate the margin
    if (deviceWidth <= 992) {
      if (elementWidth < contentMarginLeft) {
        setContentMarginLeft(elementWidth);
      }
    } else {
      setContentMarginLeft(elementWidth);
    }
  }

  return (
    <div id="dashboard-page">
      <Sidebar username={username} onCollapse={handleCollapse} />
      <main
        id="dashboard-page-content"
        style={{ marginLeft: contentMarginLeft }}
      >
        <Outlet />
      </main>
    </div>
  );
}
