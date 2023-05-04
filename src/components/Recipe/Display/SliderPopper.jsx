import PropTypes from "prop-types";
import { Popper, Slider } from "@mui/material";
import "./SliderPopper.css";

export default function SliderPopper({
  open,
  anchorEl,
  startingValue,
  minValue,
  maxValue,
  handleChange,
}) {
  return (
    <Popper open={open} anchorEl={anchorEl}>
      <div className="slider-wrapper">
        <Slider
          className="slider"
          defaultValue={startingValue}
          step={1}
          min={minValue}
          max={maxValue}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </Popper>
  );
}

SliderPopper.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  startingValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

SliderPopper.defaultProps = {
  anchorEl: null,
  startingValue: 1,
  minValue: 1,
  maxValue: 30,
};
