export default function ErrMsg({ isShowing = false, msg = "" }) {
  return isShowing ? <p className="err-msg">{msg}</p> : false;
}
