import './RecipePopup.css'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function RecipePopup({ recipe, isOpening, setIsOpening}) {
  const { url, cookTime, ingredients, instructions, nutrients, prepTime, title, servings, } = recipe;

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
        <h2>{title}</h2>
        <p id="recipe-times">Prep Time: {prepTime} minutes | Cook Time: {cookTime} minutes</p>
        <FontAwesomeIcon icon={faXmark} size="xl" className="btn" onClick={closePopup}/>
        <div className="two-col">
          <div id="ingredients-container">
            <h3>Ingredients</h3>
            <ul>{ingredients.map(el => <li>{getIngredientStrFromObj(el)}</li>)}</ul>
          </div>
          <div id="instructions-container">
            <h3>Directions</h3>
            <ol>{instructions.map(el => <li>{el}</li>)}</ol>
            <h3>Nutrition Facts</h3>
            {getNutrientStrArrFromNutrientsObj(nutrients).map(el => `${el}, `)}
          </div>
        </div>
        <form id="edit-recipe-form">
          <div className="two-col">
            <div className="left two-col">
              <div className="col">
                <label htmlFor="">Servings: {servings}</label>
                <input type="range" min="1" max="30" className="slider" value={servings}/>
              </div>
              <div className="col">
                <label htmlFor="">Calories per serving</label>
                <input type="number" value={nutrients.calories.quantity}/>
              </div>
              <div className="buttons">
                <button className="btn-secondary">Reset</button>
              </div>
            </div>
            <div className="right">
              <button className="btn-primary">Save Recipe</button>
            </div>
          </div>
        </form>
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
  // Fade out time should be the same as the transition duration in PopupWindow.css' #popup-container 
  setTimeout(() => popupContainer.style.display = 'none', 500);
}

function getNutrientStrArrFromNutrientsObj(obj){
  let nutrientArr = [];

  for(let [key, val] of Object.entries(obj)){
    nutrientArr.push(`${key}: ${val.quantity} ${val.unit}`);
  }

  return nutrientArr;
}

function getIngredientStrFromObj(obj){
  if(!obj || !obj.name) return "";
  
  let { quantity, unit, name } = obj;
  
  let str = "";

  if(quantity) str += `${quantity.n}/${quantity.d} `;

  if(unit) str += `${unit} `;

  return `${str}${name}`;
}
