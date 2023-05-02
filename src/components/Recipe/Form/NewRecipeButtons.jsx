import Button from "../../common/Button";

export default function NewRecipeButtons() {
  return (
    <Button
      text="Save to Library"
      type="submit"
      handleClick={(e) => e.preventDefault()}
    />
  );
}
