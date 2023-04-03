import "./ErrBubble.css";

export default function ErrBubble({ msg }) {
  return (
    <div className="err-bubble-wrapper">
      <div className="err-bubble">{msg}</div>
      <div className="err-bubble-triangle"></div>
    </div>
  );
}
