export default class Measurement {
  constructor(str){
    this.units = this.formatUnit(str);
  }

  formatUnit(str) {
    // String must be lowercased

    // May have an 's'
    let standardFormUnits = [
      // Volume
      'milliliter',
      'teaspoon',
      'tablespoon',
      'ounce', 
      'cup',
      'pint',
      'liter',
      'quart',
      'gallon',
      // Mass
      'milligram',
      'gram',
      'kilogram',
      'pound'
    ]

    // May have an 's', an '.', or 's.'
    let nonStandardFormUnits = [ 
      // Volume
      'ml', 
      'tsp',
      'tbsp',
      'oz',
      'c',
      'pt',
      'l',
      'qt',
      'gal',
      // Mass
      'mg',
      'g',
      'kg',
      'lb'
    ];
    
    str = str.toLowerCase();

    for(let unit of standardFormUnits){
      if(str === unit || str === unit + 's'){
        return unit;
      }
    }

    for(let unit of nonStandardFormUnits){
      if(str === unit || 
        str === unit + 's' || 
        str === unit + '.' ||
        str === unit + 's.'
        ){
          return standardFormUnits[nonStandardFormUnits.indexOf(unit)]
        }
    }

    return null;
  }
}
