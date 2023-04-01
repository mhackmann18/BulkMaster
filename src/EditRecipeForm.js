import './EditRecipeForm.css';

export default function EditRecipeForm({ 
  servingsDefaultValue, 
  servingsInputValue, 
  setServingsInputValue, 
  caloriesDefaultValue, 
  caloriesInputValue,
  setCaloriesInputValue 
}) {

  let classNameStr = 'btn-secondary';

  if(servingsDefaultValue !== servingsInputValue || caloriesDefaultValue !== caloriesInputValue){
    classNameStr += ' active';
  }

  return (
    <form id="edit-recipe-form">
      <div className="left">
        <div className="col">
          <label htmlFor="">Servings: {servingsInputValue}</label>
          <input type="range" min="1" max="30" className="slider" 
          onChange={e => setServingsInputValue(Number(e.target.value))} defaultValue={servingsDefaultValue}/>
        </div>
        <div className="col">
          <label htmlFor="">Calories per serving</label>
          <input type="number" 
          onChange={e => setCaloriesInputValue(Number(e.target.value || caloriesDefaultValue))} defaultValue={caloriesDefaultValue}/>
        </div>
        <button className="btn-secondary">Reset</button>
      </div>
      <button className="btn-seasalt">Save Recipe</button>
    </form>
  );
}
