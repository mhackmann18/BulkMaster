import { useNavigate } from "react-router-dom";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import "./Import.css";

export default function Import() {
  const navigate = useNavigate();

  const handleSubmit = (res) => navigate("search", { state: { recipe: res } });

  return (
    <div id="import-page">
      <RecipeScrapingForm handleResponse={handleSubmit} />
    </div>
  );
}
