import { useState } from "react";
import LibraryItem from "../components/LibraryItem";
import ConfirmationModal from "../components/common/ConfirmationModal";
import data from "../assets/data.json";
import "./Library.css";

export default function Library() {
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    itemId: null,
    message: "",
  });
  const recipes = data;

  return (
    <div id="library-page">
      {recipes.map((recipe) => (
        <LibraryItem
          key={recipe.id}
          recipeTitle={recipe.title}
          recipeServings={recipe.servings}
          caloriesPerRecipeServing={
            recipe.nutrients &&
            recipe.nutrients.calories &&
            recipe.nutrients.calories.quantity
          }
          recipeId={recipe.id}
          setDeleteModal={setDeleteModal}
        />
      ))}

      <ConfirmationModal
        open={deleteModal.open}
        headerText="Delete Recipe"
        messageText={deleteModal.message}
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        onCancel={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={() =>
          console.log(`Delete item with id: ${deleteModal.itemId}`)
        }
      />
    </div>
  );
}
