import { useLocation, Navigate } from "react-router-dom";
import RecipeItem from "../components/Recipe";
import "./Import.css";

export default function Recipe() {
  const { state } = useLocation();

  return state ? (
    <div id="import-recipe">
      <RecipeItem recipe={state.recipe} />
    </div>
  ) : (
    <Navigate to="/dashboard/import-recipe" />
  );
}
