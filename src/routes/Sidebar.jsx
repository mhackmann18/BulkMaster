import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faPlus,
  faBook,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ToggleTheme from "../common/ToggleTheme";
import "./Sidebar.css";

export default function Sidebar({ username }) {
  return (
    <div id="sidebar">
      <div className="upper">
        <h1>PREPMASTER</h1>
        <ul>
          <li>
            <Link to="import" className="btn">
              <FontAwesomeIcon className="sidebar-icon" icon={faArrowDown} />{" "}
              Import Recipe
            </Link>
          </li>
          <li>
            <Link to="create" className="btn">
              <FontAwesomeIcon className="sidebar-icon" icon={faPlus} /> Create
              Recipe
            </Link>
          </li>
          <li>
            <Link to="" className="btn active">
              <FontAwesomeIcon className="sidebar-icon" icon={faBook} /> Recipe
              Library
            </Link>
          </li>
          <li>
            <Link to="" className="btn">
              <FontAwesomeIcon className="sidebar-icon" icon={faGear} />{" "}
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="lower">
        <ToggleTheme />
        <div className="logout-container">
          Signed in as {username}{" "}
          <Link to="" title="logout">
            <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket} />
          </Link>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
};
