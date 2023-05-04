import { useState } from "react";
import PropTypes from "prop-types";
import SliderPopper from "./SliderPopper";
import "./SubHeading.css";

export default function SubHeading({ servings, prepTime, cookTime }) {
  if (!prepTime && !cookTime && !servings) {
    return false;
  }

  const [sliderAnchorEl, setAnchorEl] = useState(null);
  const sliderOpen = Boolean(sliderAnchorEl);

  const handleServingsButtonClick = (e) => {
    setAnchorEl(sliderAnchorEl ? null : e.currentTarget);
  };

  const onSliderChange = (value) => {
    console.log(`Set recipe servings to ${value}`);
  };

  return (
    <p id="sub-heading">
      <span>
        Servings:{" "}
        <button
          type="button"
          className={`btn-link servings-btn${sliderAnchorEl ? " active" : ""}`}
          onClick={handleServingsButtonClick}
        >
          {servings}
        </button>
      </span>
      <span>{prepTime && `Prep Time: ${prepTime} minutes`}</span>
      <span>{cookTime && `Cook Time: ${cookTime} minutes`}</span>
      <SliderPopper
        open={sliderOpen}
        anchorEl={sliderAnchorEl}
        startingValue={servings}
        handleChange={onSliderChange}
        close={() => setAnchorEl(null)}
      />
    </p>
  );
}

SubHeading.propTypes = {
  servings: PropTypes.number,
  prepTime: PropTypes.number,
  cookTime: PropTypes.number,
};

SubHeading.defaultProps = {
  servings: 0,
  prepTime: 0,
  cookTime: 0,
};
