import Recipe from "../components/Recipe";
import "./Import.css";

export default function Create() {
  return (
    <div id="create-page">
      <Recipe startingState="edit" />
    </div>
  );
}
