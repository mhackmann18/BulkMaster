import './PopupWindow.css'
import { useEffect } from 'react';

export default function PopupWindow({ isOpening, setIsOpening}) {
  
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

  setTimeout(() => popupContainer.style.opacity = 1, 100);
}

function closePopup(e){
  e.target.style.opacity = 0;
  // Fade out time should be the same as the transition duration in PopupWindow.css' #popup-container 
  setTimeout(() => e.target.style.display = 'none', 500);
}
