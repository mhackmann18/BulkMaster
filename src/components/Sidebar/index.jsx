/* eslint-disable no-restricted-globals */
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
import Cookies from "js-cookie";
import ToggleTheme from "../common/ToggleTheme";
import "./index.css";

export default function Sidebar({ username, collapsed, setCollapsed }) {
  const currentPath = useLocation().pathname;

  const dashboardRouteNames = {
    import: "import-recipe",
    create: "create-recipe",
    library: "recipe-library",
    settings: "settings",
  };

  const handleLogout = async () => {
    Cookies.remove("access_token");
  };

  return (
    <div id="sidebar" className={collapsed ? "collapsed" : ""}>
      <div className="upper">
        <h1>
          {!collapsed && (
            <span id="sidebar-logo">
              RECIPE<span>REAPER</span>
            </span>
          )}{" "}
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setCollapsed(!collapsed)}
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
              <span className="sidebar-nav-btn-text">Import</span>
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
              <span className="sidebar-nav-btn-text">Create</span>
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
              <span className="sidebar-nav-btn-text">Library</span>
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
          <Link to="/" title="logout" onClick={handleLogout}>
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
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};
