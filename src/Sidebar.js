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
      <h1>
        PREP<span className="slate-gray">MASTER</span>
      </h1>
      <ul>
        <li>
          <a href="">
            <FontAwesomeIcon className="sidebar-icon" icon={faArrowDown} />
            Import Recipe
          </a>
        </li>
        <li>
          <FontAwesomeIcon className="sidebar-icon" icon={faPlus} />
          <a href="">Create Recipe</a>
        </li>
        <li>
          <FontAwesomeIcon className="sidebar-icon" icon={faBook} />
          <a href="">Recipe Library</a>
        </li>
        <li>
          <FontAwesomeIcon className="sidebar-icon" icon={faGear} />
          <a href="">Settings</a>
        </li>
      </ul>
    </div>
  );
}
