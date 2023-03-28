import './RecipePopup.css'
import { useEffect } from 'react';

export default function RecipePopup({ recipe, isOpening, setIsOpening}) {
  useEffect(() => {
    if(isOpening){
      setIsOpening(false);
      openPopup();
    }
  });

  if(recipe){
    const { 
      url,
      cookTime,
      ingredients,
      instructions,
      nutrients,
      prepTime,
      title,
      servings, 
    } = recipe;

    console.log(recipe);
    let nutrientArr = [];

    for(let [key, val] of Object.entries(nutrients)){
      nutrientArr.push(`${key}: ${val.quantity} ${val.unit}`)
    }

    return (
      <div id="popup-container" onClick={closePopup}>
        <div className="popup" onClick={e => e.stopPropagation()}>
          
          <h2>{title}</h2>
          <p id="recipe-times">Prep Time: {prepTime} minutes | Cook Time: {cookTime} minutes</p>
          <div className="two-col">
            <div id="ingredients-container">
              <h3>Ingredients</h3>
              <ul>
                {ingredients.map(el => <li>{el.quantity && `${el.quantity.n}/${el.quantity.d}` } {el.unit} {el.name}</li>)}
              </ul>
            </div>
            <div id="instructions-container">
              <h3>Directions</h3>
              <ol>
                {instructions.map(el => <li>{el}</li>)}
              </ol>
              <h3>Nutrition Facts</h3>
              {nutrientArr.map(el => `${el}, `)}
            </div>
          </div>
          <div>
            Servings: <input type="number" value={servings}/>
            Calories per serving: <input type="number" value={nutrients.calories.quantity}/>
            <button>Save Recipe</button>
          </div>
        </div>
      </div>
    );
  } else {
    return false;
  }
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
