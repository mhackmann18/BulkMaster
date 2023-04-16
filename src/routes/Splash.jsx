import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Splash.css";

export default function Splash() {
  return (
    <div id="splash-page">
      <div className="content-wrapper">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
