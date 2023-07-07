import { useNavigate } from "react-router-dom";
import SettingsList from "../components/SettingsList";
import Button from "../components/common/Button";
import useUser from "../hooks/useUser";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  return (
    <div id="settings-page">
      <div id="settings">
        <h1 id="page-heading">Settings</h1>
        <SettingsList />
        <div className="buttons-container">
          <Button
            text="Sign Out"
            handleClick={() => {
              setUser(null);
              navigate("/");
            }}
            variant="default wide"
          />
          <Button
            text="Delete Account"
            handleClick={() => {}}
            variant="default wide"
          />
        </div>
      </div>
    </div>
  );
}
