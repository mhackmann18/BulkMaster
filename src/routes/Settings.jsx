import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SettingsList from "../components/SettingsList";
import Button from "../components/common/Button";
import useUser from "../hooks/useUser";
import StandardModal from "../components/common/StandardModal";
import ConfirmationDisplay from "../components/common/ConfirmationDisplay";
import "./Settings.css";

export default function Settings() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleAccountDeletion = () => {
    console.log("Delete account");
  };

  return (
    <div id="settings-page">
      <div id="settings">
        <h1 id="page-heading">Settings</h1>
        <SettingsList />
        <div className="buttons-container">
          <Button
            text="Sign Out"
            handleClick={() => {
              Cookies.remove("access_token");
              setUser(null);
              navigate("/");
            }}
            variant="default wide"
          />
          <Button
            text="Delete Account"
            handleClick={() => setModalOpen(true)}
            variant="default wide"
          />
        </div>
      </div>
      <StandardModal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <ConfirmationDisplay
          headerText="Confirm Account Deletion"
          messageText="Your account info and all recipes in your library will be permanently deleted."
          cancelBtnText="Cancel"
          confirmBtnText="Delete"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleAccountDeletion}
        />
      </StandardModal>
    </div>
  );
}
