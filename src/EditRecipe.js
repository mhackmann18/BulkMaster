import './EditRecipe.css';

export default function EditRecipe({ recipe }) {
  return (
    <div>
      {recipe && recipe.title}
    </div>
  )
}
