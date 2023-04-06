import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faPlus,
  faBook,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <div className="upper">
        <h1>
          PREP<span className="slate-gray">MASTER</span>
        </h1>
        <ul>
          <li>
            <a href="" className="btn">
              <FontAwesomeIcon className="sidebar-icon" icon={faArrowDown} />{" "}
              Import Recipe
            </a>
          </li>
          <li>
            <a href="" className="btn">
              <FontAwesomeIcon className="sidebar-icon" icon={faPlus} /> Create
              Recipe
            </a>
          </li>
          <li>
            <a href="" className="btn active">
              <FontAwesomeIcon className="sidebar-icon" icon={faBook} /> Recipe
              Library
            </a>
          </li>
          <li>
            <a href="" className="btn">
              <FontAwesomeIcon className="sidebar-icon" icon={faGear} />{" "}
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="lower"></div>
    </div>
  );
}
