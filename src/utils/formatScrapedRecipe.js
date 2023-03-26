import Measurement from "./Measurement";

export default function formatRecipeData(data) {
  let { canonical_url, cook_time, ingredients, instructions_list, nutrients, prep_time, title, yields } = data;

  let recipe = {
    title,
    ingredients: ingredients.map(createIngredientObjFromStr),
    nutrients
  }

  return recipe;
}

function createIngredientObjFromStr(str) {
  str = str.trim();
  let tokens = str.split(' ');

  // Checks for int, decimal, or vulgar fractions
  let intOrFractionRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?$/;

  let numericalQuantity = null;

  // Check for integers, decimals and fractional strings ('10', '2.32', '1/2' etc.)
  while(tokens[0].match(intOrFractionRE)){
    numericalQuantity += eval(tokens.shift());
  }

  // Check for fractional unicode characters
  let unicodeFractions = [ '½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅐', '⅛', '⅜', '⅝', '⅞', '⅑', '⅒' ];
  let unicodeFractionsNumericalConversions = [ .5, .333, .666, .25, .75, .2, .4, .6, .8, .167, .833, .143, .125, .375, .525, .875, .111, .1 ];
                        
  if(tokens[0].length === 1 && unicodeFractions.includes(tokens[0])){
    numericalQuantity += unicodeFractionsNumericalConversions[unicodeFractions.indexOf(tokens[0])];
    tokens.shift();
  }
  
  // Get the units if any
  let units;

  if((units = new Measurement(tokens[0]).units) != null){
    tokens.shift();
  }

  return {
    name: tokens.join(' '),
    quantity: numericalQuantity,
    units
  };
}
