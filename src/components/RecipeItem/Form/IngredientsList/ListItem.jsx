import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import IngredientsListItemRow from "./ListItemRow";
import Ingredient from "../../../../utils/Ingredient";

export default function IngredientsListItem({ ingredient }) {
  return (
    <li>
      <IngredientsListItemRow key={uuidv4()} subIngredient={ingredient} />
    </li>
  );
}

IngredientsListItem.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient),
};

IngredientsListItem.defaultProps = {
  ingredient: new Ingredient({ name: "", quantity: null, unit: null }),
};
