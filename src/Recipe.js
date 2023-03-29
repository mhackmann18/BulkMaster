import './Recipe.css';

export default function Recipe({ recipe }) { 
  const { cookTime, ingredients, instructions, nutrients, prepTime, title, } = recipe;

  return (
    <div id="recipe">
      <h2>{title}</h2>
      <p id="recipe-times">Prep Time: {prepTime ? `${prepTime} minutes` : 'N/A'} | Cook Time: {cookTime ? `${cookTime} minutes` : 'N/A'}</p>
      <div className="two-col" id="recipe-content">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <ul>{ingredients.map((el, i) => <li key={i}>{getIngredientStrFromObj(el)}</li>)}</ul>
        </div>
        <div id="instructions-container">
          <h3>Directions</h3>
          <ol>{instructions.map((el, i) => <li key={i}>{el}</li>)}</ol>
          <h3>Nutrition Facts</h3>
          {getNutrientStrArrFromNutrientsObj(nutrients).map(el => `${el}, `)}
        </div>
      </div>
    </div>
  );
}

function getNutrientStrArrFromNutrientsObj(obj){
  if(!obj) return null;

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
