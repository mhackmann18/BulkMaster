import Theme from "./Theme";
import Username from "./Username";
import Password from "./Password";
import "./index.css";

export default function SettingsList() {
  return (
    <ul id="settings-list">
      <Theme />
      <Username />
      <Password />
    </ul>
  );
}
