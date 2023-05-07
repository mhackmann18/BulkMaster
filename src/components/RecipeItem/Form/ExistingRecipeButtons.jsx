import PropTypes from "prop-types";
import Button from "../../common/Button";

export default function ExistingRecipeButtons({ handleCancelButtonClick }) {
  return (
    <>
      <Button
        text="Cancel"
        type="button"
        handleClick={handleCancelButtonClick}
      />
      <Button text="Save Changes" type="submit" />
    </>
  );
}

ExistingRecipeButtons.propTypes = {
  handleCancelButtonClick: PropTypes.func.isRequired,
};
