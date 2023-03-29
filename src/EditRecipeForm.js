import './EditRecipeForm.css';

export default function EditRecipeForm({ recipe }) {
  const { servings, nutrients } = recipe;

  return (
    <form id="edit-recipe-form">
      <div className="two-col">
        <div className="left two-col">
          <div className="col">
            <label htmlFor="">Servings: {servings}</label>
            <input type="range" min="1" max="30" className="slider" value={servings}/>
          </div>
          <div className="col">
            <label htmlFor="">Calories per serving</label>
            <input type="number" value={nutrients.calories.quantity}/>
          </div>
          <div className="buttons">
            <button className="btn-secondary">Reset</button>
          </div>
        </div>
        <div className="right">
          <button className="btn-primary">Save Recipe</button>
        </div>
      </div>
    </form>
  );
}
