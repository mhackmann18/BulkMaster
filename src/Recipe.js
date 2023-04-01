import './Recipe.css';

export default function Recipe({ recipe }) { 
  const { cookTime, ingredients, instructions, nutrients, prepTime, title, userInput } = recipe;

  const ingredientsMultiplier = getQuantityMultiplier(recipe, userInput.servings, userInput.calories);
  const nutrientsMultiplier = userInput.calories / recipe.nutrients.calories.quantity;

  return (
    <div id="recipe">
      <h2>{title}</h2>
      <p id="recipe-times">Prep Time: {prepTime ? `${prepTime} minutes` : 'N/A'} | Cook Time: {cookTime ? `${cookTime} minutes` : 'N/A'}</p>
      <div className="two-col" id="recipe-content">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <ul>{ingredients.map((el, i) => <li key={i}>{getIngredientStrFromObj(el, ingredientsMultiplier)}</li>)}</ul>
        </div>
        <div id="instructions-container">
          <h3>Directions</h3>
          <ol>{instructions.map((el, i) => <li key={i}>{el}</li>)}</ol>
          <h3>Nutrition Facts</h3>
          {getNutrientStringsFromObj(nutrients, nutrientsMultiplier).map((el, i) => 
          i + 1 !== Object.keys(nutrients).length ? `${el}, ` : `${el}`)}
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
  if(!recipe || !newServingsCount || !newCaloriesCount) return null;
  
  let oldServingsCount = recipe.servings;
  
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
