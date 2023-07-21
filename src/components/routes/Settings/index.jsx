import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SettingsList from "./List";
import Button from "../../common/Button";
import useUser from "../../../hooks/useUser";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import User from "../../../utils/UserController";
import useHandleAuthError from "../../../hooks/useHandleAuthError";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import "./index.css";

export default function Settings() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleAuthError = useHandleAuthError();
  const { setUser, user } = useUser();
  const { addErrorToastMessage, toast, closeToast } = useToast();

  const handleAccountDeletion = async () => {
    const { data, error, message } = await User.deleteUser(user?.id);

    handleAuthError(error);

    if (data) {
      navigate("/login", {
        state: { successMessage: "Your account has been deleted" },
      });
    } else if (error) {
      addErrorToastMessage(
        `Unable to delete account. ${message || "An unexpected error occurred"}`
      );
    }
  };

  return (
    <>
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
            messageText="Your account information and all recipes in your library will be permanently deleted."
            cancelBtnText="Cancel"
            confirmBtnText="Delete"
            onCancel={() => setModalOpen(false)}
            onConfirm={handleAccountDeletion}
          />
        </StandardModal>
      </div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
