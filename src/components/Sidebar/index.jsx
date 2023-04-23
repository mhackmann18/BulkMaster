import { useState, useRef, useEffect } from "react";
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

export default function Sidebar({ username, onCollapse }) {
  const deviceWidth =
    // eslint-disable-next-line no-restricted-globals
    window.innerWidth > 0 ? window.innerWidth : screen.width;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(deviceWidth <= 992);
  const currentPath = useLocation().pathname;
  const elementRef = useRef(null);

  useEffect(() => {
    onCollapse(elementRef.current.offsetWidth);
  }, [sidebarCollapsed]);

  const dashboardRouteNames = {
    import: "import-recipe",
    create: "create-recipe",
    library: "recipe-library",
    settings: "settings",
  };

  return (
    <div
      id="sidebar"
      className={sidebarCollapsed ? "collapsed" : ""}
      ref={elementRef}
    >
      <div className="upper">
        <h1>
          {!sidebarCollapsed && "PREPMASTER"}{" "}
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            size="xs"
            id="sidebar-collapse-btn"
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
              <div className="sidebar-icon-wrapper">
                <FontAwesomeIcon className="sidebar-icon" icon={faArrowDown} />
              </div>
              <span className="sidebar-nav-btn-text">Import Recipe</span>
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
              <div className="sidebar-icon-wrapper">
                <FontAwesomeIcon className="sidebar-icon" icon={faPlus} />
              </div>
              <span className="sidebar-nav-btn-text">Create Recipe</span>
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
              <div className="sidebar-icon-wrapper">
                <FontAwesomeIcon className="sidebar-icon" icon={faBook} />
              </div>
              <span className="sidebar-nav-btn-text">Recipe Library</span>
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
              <div className="sidebar-icon-wrapper">
                <FontAwesomeIcon className="sidebar-icon" icon={faGear} />
              </div>
              <span className="sidebar-nav-btn-text">Settings</span>
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
  onCollapse: PropTypes.func.isRequired,
};
