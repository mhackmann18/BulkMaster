import { useState } from "react";
import { useParams } from "react-router-dom";
import recipes from "../assets/data.json";
import RecipeItem from "../components/Recipe";
import "./Import.css";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  for (const el of recipes) {
    if (!recipe && el.id === Number(id)) {
      setRecipe(el);
    }
  }

  return (
    <div id="import-page-content">
      <RecipeItem recipe={recipe} />
    </div>
  );
}
