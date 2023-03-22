import './ErrorMsg.css';

function ErrorMsg({ isShowing, msg }) {
  return (
    isShowing ? <p>{msg}</p> : false
  );
}

export default ErrorMsg;
