import RecipeItem from "../components/RecipeItem";
import "./Import.css";

export default function Create() {
  return (
    <div id="create-page">
      <RecipeItem startingDisplayType="form" />
    </div>
  );
}
