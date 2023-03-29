import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EditRecipeForm from './EditRecipeForm';
import Recipe from './Recipe';
import './RecipePopup.css';

export default function RecipePopup({ recipe, isOpening, setIsOpening}) {
  const [servingsInputValue, setServingsInputValue] = useState(recipe.servings);
  const [caloriesInputValue, setCaloriesInputValue] = useState(recipe.nutrients.calories.quantity);
  const popupRef = useRef(null);

  let popupStyle = popupRef.current && { top: `calc(50% - ${popupRef.current.offsetHeight/2}px)` };

  useEffect(() => {
    if(isOpening){
      setIsOpening(false);
      openPopup();
    }
  });

  console.log(recipe);

  return (
    <div id="popup-container" onClick={closePopup}>
      <div className="popup" ref={popupRef} onClick={e => e.stopPropagation()} style={popupStyle}>
        <FontAwesomeIcon icon={faXmark} size="xl" className="btn" onClick={closePopup}/>
        <Recipe recipe={recipe} />
        <div className="form-wrapper">
          <EditRecipeForm 
          servingsDefaultValue={recipe.servings} 
          servingsInputValue={servingsInputValue}
          setServingsInputValue={setServingsInputValue}
          caloriesDefaultValue={recipe.nutrients.calories.quantity}
          setCaloriesInputValue={setCaloriesInputValue} />        
        </div>
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
