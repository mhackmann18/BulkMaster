import './EditRecipeForm.css';

export default function EditRecipeForm({ 
  servingsDefaultValue, 
  servingsInputValue, 
  setServingsInputValue, 
  caloriesDefaultValue, 
  caloriesInputValue,
  setCaloriesInputValue 
}) {
  const servingsInputMaxValue = 99;
  const caloriesInputMaxValue = 9999;
  const resetBtnActive = servingsDefaultValue !== servingsInputValue || caloriesDefaultValue !== caloriesInputValue;

  function handleResetBtnClick(e){
    e.preventDefault();
    setServingsInputValue(servingsDefaultValue);
    caloriesDefaultValue && setCaloriesInputValue(caloriesDefaultValue);
  }

  function handleNumberInputChange(e, maxValue, callbackfn){
    if(e.target.value === ""){
      callbackfn("");
    } else if(validateNumberInput(e.target.value, maxValue)){
      callbackfn(Number(e.target.value));
    } 
  }

  function handleNumberInputKeydown(e){
    // Only allows the backspace key and number keys from the number row and number pad
    // https://stackoverflow.com/questions/7372067/is-there-any-way-to-prevent-input-type-number-getting-negative-values
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode === 8)){
        e.preventDefault();
    } 
  }

  function handleNumberInputPaste(e, maxValue){
    // https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
    let clipboardData, pastedData;
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
  
    // If pastedData is not 0 or a positive integer less than maxValue, stop it from being pasted
    if(!/^\d+$/.test(pastedData) || Number(pastedData) > maxValue){
      e.stopPropagation();
      e.preventDefault();
    }
  }

  return (
    <form id="edit-recipe-form">
      <div className="left">
        <label htmlFor="">Servings</label>
        <input id="erf-servings-input" type="number" value={servingsInputValue} min="0" max={servingsInputMaxValue}
        onChange={e => handleNumberInputChange(e, servingsInputMaxValue, setServingsInputValue)} 
        onKeyDown={handleNumberInputKeydown} 
        onPaste={e => handleNumberInputPaste(e, servingsInputMaxValue)}/>
        {caloriesDefaultValue && <>
        <label htmlFor="">Calories per serving</label>
        <input id="erf-calories-input" type="number" value={caloriesInputValue} min="0" max={caloriesInputMaxValue}
        onChange={e => handleNumberInputChange(e, caloriesInputMaxValue, setCaloriesInputValue)} 
        onKeyDown={handleNumberInputKeydown} 
        onPaste={e => handleNumberInputPaste(e, caloriesInputMaxValue)}/>
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

function validateNumberInput(input, maxValue){
  if(input === ""){
    return true;
  } else if(/^[0-9]+$/.test(input) && Number(input) <= maxValue){
    return true;
  } else {
    return false;
  }
}
