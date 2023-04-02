import { useState } from 'react';
import EditRecipeForm from './EditRecipeForm';
import './Recipe.css';

export default function Recipe({ recipe }) { 
  const { cookTime, ingredients, instructions, nutrients, prepTime, title, servings } = recipe;
  const caloriesInitialValue = nutrients && nutrients.calories && nutrients.calories.quantity;

  // The following recipe properties must be non-false values: title, instructions, servings, and ingredients
  const [servingsInputValue, setServingsInputValue] = useState(servings);
  const [caloriesInputValue, setCaloriesInputValue] = useState(caloriesInitialValue);
  
  const ingredientsMultiplier = getQuantityMultiplier(recipe, servingsInputValue, caloriesInputValue);
  const nutrientsMultiplier = caloriesInputValue / caloriesInitialValue;

  return (
    <div id="recipe">
      <div id="recipe-header">
        <h2>{title}</h2>
        {(prepTime || cookTime) && <p id="recipe-times">
          {prepTime && `Prep Time: ${prepTime} minutes`} 
          {(prepTime && cookTime) && ' | '} 
          {cookTime && `Cook Time: ${cookTime} minutes`}
        </p>}
        <div className="form-wrapper">
          <EditRecipeForm 
          servingsDefaultValue={servings} 
          servingsInputValue={servingsInputValue}
          setServingsInputValue={setServingsInputValue}
          caloriesDefaultValue={caloriesInitialValue}
          caloriesInputValue={caloriesInputValue}
          setCaloriesInputValue={setCaloriesInputValue} />        
        </div>
      </div>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <ul>{ingredients.map((el, i) => <li key={i}>{getIngredientStrFromObj(el, ingredientsMultiplier)}</li>)}</ul>
        </div>
        <div id="instructions-container">
          <h3>Directions</h3>
          <ol>{instructions.map((el, i) => <li key={i}>{el}</li>)}</ol>
          {nutrients && <>
          <h3>Nutrition Facts</h3>
          {getNutrientStringsFromObj(nutrients, nutrientsMultiplier).map((el, i) => 
          i + 1 !== Object.keys(nutrients).length ? `${el}, ` : `${el}`)}
          </>}
        </div>
      </div>
    </div>
  );
}

function getNutrientStringsFromObj(obj, mult=1){
  if(!obj || mult <= 0) return null;

  let nutrientArr = [];

  for(let [key, val] of Object.entries(obj)){
    let name = key.replace('Content', ''); 
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let nameWords = name.match(/[A-Z][a-z]+/g);
    let nameStr = nameWords.reduce((acc, el, i) => i + 1 !== nameWords.length ? acc + el + " " : acc + el, "");
    if(nameStr === 'Carbohydrate') nameStr += 's';
    val && nutrientArr.push(`${nameStr}: ${formatAmount(val.quantity * mult, 0)}${val.unit ? ' ' + val.unit : ''}`);
  }

  return nutrientArr;
}

function getIngredientStrFromObj(obj, mult=1){
  if(!obj || !obj.name) return "";
  
  let { quantity, unit, name } = obj;
  
  let str = "";

  if(quantity) str += `${formatAmount(quantity * mult, 2)} `;

  if(unit) str += `${unit} `;

  return `${str}${name}`;
}

function getQuantityMultiplier(recipe, newServingsCount, newCaloriesCount){
  if(!recipe || !newServingsCount) return null;

  let oldServingsCount = recipe.servings;

  if(!newCaloriesCount) return newServingsCount / oldServingsCount;
  
  if(!oldServingsCount) return null;
  
  let oldCalorieCount = recipe.nutrients && recipe.nutrients.calories.quantity;

  if(!oldCalorieCount) return newServingsCount / oldServingsCount;

  return newCaloriesCount / oldCalorieCount * newServingsCount / oldServingsCount;
}

function formatAmount(num, precision){
  let multiplier = precision * 10;
  if(!precision || precision < 0) multiplier = 1;
  return `${Math.round(num * multiplier) / multiplier}`;
}
