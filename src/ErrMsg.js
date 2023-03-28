export default function ErrMsg({ isShowing, msg }) {
  return isShowing ? <p className="err-msg">{msg}</p> : false;
}
