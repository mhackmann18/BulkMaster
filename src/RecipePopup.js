import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EditRecipeForm from './EditRecipeForm';
import Recipe from './Recipe';
import './RecipePopup.css';

export default function RecipePopup({ recipe, isOpening, setIsOpening}) {

  useEffect(() => {
    if(isOpening){
      setIsOpening(false);
      openPopup();
    }
  });

  console.log(recipe);

  return (
    <div id="popup-container" onClick={closePopup}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <FontAwesomeIcon icon={faXmark} size="xl" className="btn" onClick={closePopup}/>
        <Recipe recipe={recipe} />
        <EditRecipeForm recipe={recipe} />        
      </div>
    </div>
  );
}

function openPopup() {
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'block';

  setTimeout(() => popupContainer.style.opacity = 1, 100);
}

function closePopup(){
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.opacity = 0;
  // Fade out time should be the same as the transition duration in css file 
  setTimeout(() => popupContainer.style.display = 'none', 500);
}
