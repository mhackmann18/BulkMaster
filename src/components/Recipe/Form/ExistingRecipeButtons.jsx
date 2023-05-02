import PropTypes from "prop-types";
import Button from "../../common/Button";

export default function ExistingRecipeButtons({ switchToDiv }) {
  return (
    <>
      <Button text="Cancel" type="button" handleClick={switchToDiv} />
      <Button text="Save Changes" type="submit" />
    </>
  );
}

ExistingRecipeButtons.propTypes = {
  switchToDiv: PropTypes.func.isRequired,
};
