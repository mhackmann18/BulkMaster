import { useNavigate } from "react-router-dom";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div id="rsf-wrapper">
      <p id="main-msg">Meal prepping your favorite recipes just got easier.</p>
      <RecipeScrapingForm
        handleResponse={(res) => {
          navigate("search", { state: { recipe: res } });
        }}
      />
    </div>
  );
}
