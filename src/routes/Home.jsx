import { useState, useEffect } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import reaper from "../assets/reaper.png";
import reaperReading from "../assets/reaper-reading.png";
import reaperCooking from "../assets/reaper-cooking.png";
import mouseScroll from "../assets/mouse-scroll.gif";

export default function Home() {
  const [mouseScrollActive, setMouseScrollActive] = useState(true);

  const handleScroll = (e) => {
    setMouseScrollActive(e.target.scrollingElement.scrollTop === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div id="home-page">
      <div id="home-window-1">
        <div className="h-box">
          <div className="left-content">
            <img className="mascot" src={reaper} alt="mascot" />
          </div>
          <div className="right-content text-box">
            <h2 className="title">
              Harvest deathly good recipes from across the web
            </h2>
            <p>
              No need to scroll through ads and walls of text to reach a recipe.
              RecipeReaper will find it for you.
            </p>
            <RecipeScrapingForm variant="inline" />
          </div>
        </div>
        <img
          className={`mouse-scroll-gif${mouseScrollActive ? "" : " hidden"}`}
          src={mouseScroll}
          alt="mouse-gif"
        />
      </div>
      <div id="home-window-2">
        <div className="h-box">
          <div className="left-content text-box">
            <h2 className="title">Start building your personal cookbook</h2>
            <p>Manage recipes from your personal library.</p>
            <ul>
              <li>
                <FontAwesomeIcon className="icon" icon={faCircle} /> Save
                imported recipes and custom recipes
              </li>
              <li>
                <FontAwesomeIcon className="icon" icon={faCircle} /> Access
                saved recipes across devices
              </li>
              <li>
                <FontAwesomeIcon className="icon" icon={faCircle} /> Export
                recipe pdfs for printing and sharing
              </li>
            </ul>
          </div>
          <div className="right-content">
            <img className="mascot" src={reaperReading} alt="" />
          </div>
        </div>
      </div>
      <div id="home-window-3">
        <div className="h-box">
          <div className="left-content">
            <img className="mascot" src={reaperCooking} alt="reaper-cooking" />
          </div>
          <div className="right-content text-box">
            <h2 className="title">
              Create and customize recipes to make them yours
            </h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
              quasi harum temporibus!
            </p>
            <button className="btn-default" type="button" />
          </div>
        </div>
      </div>
    </div>
  );
}
