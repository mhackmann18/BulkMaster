export default function NumberInput({
  value,
  setValue,
  maxValue,
  minValue,
  className = "",
}) {
  function handleChange(e, maxValue, callbackfn) {
    if (e.target.value === "") {
      callbackfn("");
    } else if (validateNumberInput(e.target.value, maxValue, minValue)) {
      callbackfn(Number(e.target.value));
    }
  }

  function handleKeydown(e) {
    // Only allows the backspace key and number keys from the number row and number pad
    // https://stackoverflow.com/questions/7372067/is-there-any-way-to-prevent-input-type-number-getting-negative-values
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode === 8
      )
    ) {
      e.preventDefault();
    }
  }

  function handlePaste(e, maxValue, minValue = 0) {
    // https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
    let clipboardData, pastedData;
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData("Text");

    if (!validateNumberInput(pastedData, maxValue, minValue)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  return (
    <input
      type="number"
      value={value}
      min={minValue}
      max={maxValue}
      className={className}
      onChange={(e) => handleChange(e, maxValue, setValue)}
      onKeyDown={handleKeydown}
      onPaste={(e) => handlePaste(e, maxValue, minValue)}
    />
  );
}

function validateNumberInput(input, maxValue = Infinity, minValue = 0) {
  if (input === "") {
    return true;
  } else if (
    /^[0-9]+$/.test(input) &&
    Number(input) <= maxValue &&
    Number(input) >= minValue
  ) {
    return true;
  } else {
    return false;
  }
}
