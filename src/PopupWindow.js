import './PopupWindow.css'
import { useEffect } from 'react';

// Popup html and js from https://codepen.io/Dr_rakcha/pen/eyyqbg
function PopupWindow({ isOpening, setIsOpening}) {
  
  useEffect(() => {
    if(isOpening){
      setIsOpening(false);
      openPopup();
    }
  });

  return (
    <div id="popup-container" onClick={closePopup}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button>Send</button>
      </div>
    </div>
  );
}

function openPopup() {
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'block';

  // fade in
  setTimeout(() => popupContainer.style.opacity = 1, 100);
}

function closePopup(e){
  // fade out 
  e.target.style.opacity = 0;
  setTimeout(() => e.target.style.display = 'none', 500);
}

export default PopupWindow;
