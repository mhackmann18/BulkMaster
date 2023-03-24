export default function formatRecipeData(data) {
  // console.log(data);
  let { canonical_url, cook_time, ingredients, instructions_list, nutrients, prep_time, title, yields } = data;
  // console.log(ingredients);
  // console.log(nutrients);
  console.log(formatIngredientsArray(ingredients)); 
  let recipe = {
    title,
  }
}

function formatIngredientsArray(arr) {
  let ingredients = [];

  for(let item of arr){
    item = item.trim();

    // Regex from https://stackoverflow.com/questions/24113162/regexp-to-match-fraction
    // Matches all integers or fractions followed by a space from the start of the string
    let intOrFractionRE = /^((?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?\s)+/g;  
    
    let fractionalQuantity = item.match(intOrFractionRE)[0];
    fractionalQuantity = fractionalQuantity.trim();

    let fractionsArr = fractionalQuantity.split(" ");
    let numericalQuantity = fractionsArr.reduce((acc, cur) => acc + eval(cur), 0);

    item = item.replace(intOrFractionRE, "");

    // Get units
    let name = item.substr(item.indexOf(" ") + 1);

    ingredients.push({
      name,
      fractionalQuantity,
      numericalQuantity,
      units: item.split(" ", 1).pop()
    });
  }

  return ingredients;
}
