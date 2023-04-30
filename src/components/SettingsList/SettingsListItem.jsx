import PropTypes from "prop-types";

export default function SettingsListItem({ headerText, children }) {
  return (
    <li className="settings-list-item">
      <h4>{headerText}</h4>
      {children}
    </li>
  );
}

SettingsListItem.propTypes = {
  headerText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SettingsListItem.defaultProps = {
  headerText: "",
};
