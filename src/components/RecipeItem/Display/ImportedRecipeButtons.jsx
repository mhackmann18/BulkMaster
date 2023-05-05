import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../common/Button";

export default function ImportedRecipeButtons({ switchToForm }) {
  const navigate = useNavigate();

  return (
    <>
      <Button text="Back" type="button" handleClick={() => navigate(-1)} />
      <Button text="Edit" type="button" handleClick={switchToForm} />
      <Button text="Save" type="button" handleClick={() => {}} />
    </>
  );
}

ImportedRecipeButtons.propTypes = {
  switchToForm: PropTypes.func.isRequired,
};
