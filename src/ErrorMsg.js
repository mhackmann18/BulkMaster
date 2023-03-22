export default function ErrorMsg({ isShowing, msg }) {
  return isShowing ? <p className='err-msg'>{msg}</p> : false;
}
