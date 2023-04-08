import NumberInput from "./NumberInput";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  return (
    <div>
      <label htmlFor="prep-time">Prep Time: </label>
      <NumberInput value={prepTime} minValue={0} maxValue={999} />
      <select name="time-units" id="">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
      <label htmlFor="">Cook Time: </label>
      <NumberInput value={cookTime} minValue={0} maxValue={999} />
      <select name="time-units" id="">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
    </div>
  );
}
