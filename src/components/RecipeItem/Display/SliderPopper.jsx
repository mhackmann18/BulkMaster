import PropTypes from "prop-types";
import { ClickAwayListener, Popper, Slider } from "@mui/material";
import "./SliderPopper.css";

export default function SliderPopper({
  open,
  anchorEl,
  startingValue,
  minValue,
  maxValue,
  handleChange,
  close,
}) {
  return (
    <Popper open={open} anchorEl={anchorEl}>
      <ClickAwayListener onClickAway={close}>
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
      </ClickAwayListener>
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
  close: PropTypes.func,
};

SliderPopper.defaultProps = {
  anchorEl: null,
  startingValue: 1,
  minValue: 1,
  maxValue: 30,
  close: () => false,
};
