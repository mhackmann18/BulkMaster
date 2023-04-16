import { Link, useLocation } from "react-router-dom";
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
import "./index.css";

export default function Sidebar({ username }) {
  const currentPath = useLocation().pathname;

  const dashboardRouteNames = {
    import: "import-recipe",
    create: "create-recipe",
    library: "recipe-library",
    settings: "settings",
  };

  return (
    <div id="sidebar">
      <div className="upper">
        <h1>PREPMASTER</h1>
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
              Import Recipe
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
              <FontAwesomeIcon className="sidebar-icon" icon={faPlus} /> Create
              Recipe
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
              <FontAwesomeIcon className="sidebar-icon" icon={faBook} /> Recipe
              Library
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
