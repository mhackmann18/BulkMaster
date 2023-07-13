import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Toast from "../components/common/Toast";
import useToast from "../hooks/useToast";
import "./account-page.css";

export default function Login() {
  const { toast, closeToast, addErrorToastMessage } = useToast();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.errorMessage) {
      addErrorToastMessage(state.errorMessage);
    }
  }, []);

  return (
    <div id="login-page" className="account-page">
      <LoginForm />
      <Toast state={toast} onClose={closeToast} />
    </div>
  );
}
