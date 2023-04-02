import './ButtonMain.css';

export default function ButtonMain({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn-main">{text}</button>
  );
}
