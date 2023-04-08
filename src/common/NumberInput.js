import PropTypes from "prop-types";

export default function NumberInput({
  value,
  setValue,
  maxValue,
  minValue,
  variant,
}) {
  function handleChange(e) {
    if (validateNumberInput(e.target.value, maxValue, minValue)) {
      setValue(e.target.value === "" ? "" : Number(e.target.value));
    }
  }

  function handleKeydown(e) {
    // Only allows the backspace key and number keys from the number row and number pad
    // Credit to: https://stackoverflow.com/questions/7372067/is-there-any-way-to-prevent-input-type-number-getting-negative-values
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

  function handlePaste(e) {
    // Credit to https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData("Text");

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
      className={variant}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      onPaste={handlePaste}
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

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])])
    .isRequired,
  setValue: PropTypes.func.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  variant: PropTypes.string,
};

NumberInput.defaultProps = {
  minValue: 0,
};
