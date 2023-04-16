import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import disableInputScroll from "../utils/disableInputScroll";
import "./Splash.css";

export default function Splash() {
  // disableInputScroll();

  return (
    <div id="splash-page" className="justify-content">
      <div className="content-width">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
