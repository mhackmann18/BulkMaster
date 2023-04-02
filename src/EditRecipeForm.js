import './EditRecipeForm.css';

export default function EditRecipeForm({ 
  servingsDefaultValue, 
  servingsInputValue, 
  setServingsInputValue, 
  caloriesDefaultValue, 
  caloriesInputValue,
  setCaloriesInputValue 
}) {

  const resetBtnActive = servingsDefaultValue !== servingsInputValue || caloriesDefaultValue !== caloriesInputValue;

  function handleResetBtnClick(e){
    e.preventDefault();
    setServingsInputValue(servingsDefaultValue);
    caloriesDefaultValue && setCaloriesInputValue(caloriesDefaultValue);
  }

  return (
    <form id="edit-recipe-form">
      <div className="left">
        <label htmlFor="">Servings</label>
        <input id="erf-servings-input" type="number"  value={servingsInputValue} min="1" max="99"
        onChange={e => setServingsInputValue(Number(e.target.value))}/>
        {/* <input type="range" min="1" max="30" className="slider" 
        onChange={e => setServingsInputValue(Number(e.target.value))} defaultValue={servingsDefaultValue}/> */}
        {caloriesDefaultValue && <>
          <label htmlFor="">Calories per serving</label>
          <input id="erf-calories-input" type="number" min="1" max="9999" value={caloriesInputValue}
          onChange={e => setCaloriesInputValue(Number(e.target.value || caloriesDefaultValue))}/>
        </>}
        {resetBtnActive && <button onClick={handleResetBtnClick}>Reset</button>}
      </div>
      <div>
        <button onClick={e => e.preventDefault()}>Print</button>
        <button onClick={e => e.preventDefault()}>Save</button>
      </div>
    </form>
  );
}
