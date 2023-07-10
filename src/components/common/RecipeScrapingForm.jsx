import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Spinner from "./Spinner";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({ handleResponse, variant }) {
  const [inputError, setInputError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    document.activeElement.blur();
    const urlInput = e.target.querySelector("input").value;

    setIsLoading(true);

    const recipe = await getRecipeFromUrl(urlInput);

    if (typeof recipe === "string") {
      setSubmitError(recipe);
    } else {
      handleResponse(recipe);
    }

    setIsLoading(false);
  }

  return (
    <form id="recipe-scraping-form" className={variant} onSubmit={handleSubmit}>
      {!isLoading ? (
        <>
          <input
            type="text"
            id="url-input"
            placeholder="Paste a recipe's URL"
            onFocus={() => {
              setInputError("");
              setSubmitError("");
            }}
          />
          {inputError && (
            <Alert id="rsf-input-error" severity="error">
              {inputError}
            </Alert>
          )}
          <button className="btn-main" type="submit">
            Get Recipe
          </button>
          {submitError && (
            <Alert id="rsf-submit-error" severity="error">
              {submitError}
            </Alert>
          )}{" "}
        </>
      ) : (
        <Spinner />
      )}
    </form>
  );
}

RecipeScrapingForm.propTypes = {
  handleResponse: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

RecipeScrapingForm.defaultProps = {
  variant: "",
};
