import "./Home.css";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import reaper from "../assets/reaper.png";

export default function Home() {
  return (
    <div id="home-page">
      <div id="home-window-1">
        <div className="h-box">
          <div className="left-content">
            <img className="reaper-img" src={reaper} alt="mascot" />
          </div>
          <div className="right-content">
            <h2 className="title">
              Harvest deathly good recipes from across the web
            </h2>
            <p>
              No need to scroll through ads and walls of text to reach the
              recipe. RecipeReaper will find it for you.
            </p>
            <RecipeScrapingForm variant="inline" />
          </div>
        </div>
        <div>icon</div>
      </div>
    </div>
  );
}
