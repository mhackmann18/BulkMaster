import RecipeItem from "../RecipeItem";
import Recipe from "../../utils/Recipe";
import Ingredient from "../../utils/Ingredient";
import "./Create.css";

export default function Create() {
  return (
    <div id="create-page">
      <RecipeItem
        startRecipe={
          new Recipe({
            title: "",
            ingredients: [new Ingredient({ name: "", unit: "", quantity: 0 })],
            instructions: [""],
            nutrients: null,
            servings: "",
            servingSize: { quantity: 0, unit: "" },
            prepTime: 0,
            cookTime: 0,
            url: "",
          })
        }
        startingDisplayType="form"
      />
    </div>
  );
}
