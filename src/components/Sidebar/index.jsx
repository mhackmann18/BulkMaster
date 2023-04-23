import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowDown,
  faPlus,
  faBook,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ToggleTheme from "../common/ToggleTheme";
import "./index.css";

export default function Sidebar({ username }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const currentPath = useLocation().pathname;

  const dashboardRouteNames = {
    import: "import-recipe",
    create: "create-recipe",
    library: "recipe-library",
    settings: "settings",
  };

  return (
    <div id="sidebar" className={sidebarCollapsed ? "collapsed" : ""}>
      <div className="upper">
        <h1>
          {!sidebarCollapsed && "PREPMASTER"}{" "}
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            size="xs"
            id="sidebar-menu-icon"
          />
        </h1>
        <ul>
          <li>
            <Link
              to={dashboardRouteNames.import}
              className={
                currentPath.includes(dashboardRouteNames.import)
                  ? "active btn"
                  : "btn"
              }
            >
              <FontAwesomeIcon className="sidebar-icon" icon={faArrowDown} />{" "}
              <span>Import Recipe</span>
            </Link>
          </li>
          <li>
            <Link
              to="create-recipe"
              className={
                currentPath.includes(dashboardRouteNames.create)
                  ? "active btn"
                  : "btn"
              }
            >
              <FontAwesomeIcon className="sidebar-icon" icon={faPlus} />{" "}
              <span>Create Recipe</span>
            </Link>
          </li>
          <li>
            <Link
              to="recipe-library"
              className={
                currentPath.includes(dashboardRouteNames.library)
                  ? "active btn"
                  : "btn"
              }
            >
              <FontAwesomeIcon className="sidebar-icon" icon={faBook} />{" "}
              <span>Recipe Library</span>
            </Link>
          </li>
          <li>
            <Link
              to="settings"
              className={
                currentPath.includes(dashboardRouteNames.settings)
                  ? "active btn"
                  : "btn"
              }
            >
              <FontAwesomeIcon className="sidebar-icon" icon={faGear} />{" "}
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="lower">
        <ToggleTheme />
        <div className="logout-container">
          <span>{username} </span>
          <Link to="" title="logout">
            <FontAwesomeIcon
              className="icon"
              icon={faArrowRightFromBracket}
              rotation={180}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
};
