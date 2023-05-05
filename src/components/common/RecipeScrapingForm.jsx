/* eslint-disable camelcase */
import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Spinner from "./Spinner";
import { isValidHttpURL } from "../../utils/validation";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({ handleResponse, variant }) {
  const [inputError, setInputError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    document.activeElement.blur();
    const inputString = e.target.querySelector("input").value;

    if (!isValidHttpURL(inputString)) {
      setInputError("Please paste a valid recipe URL");
      return false;
    }

    setIsLoading(true);
    const res = await fetch(
      `http://localhost:8000/recipe-data?url=${inputString}`
    );

    if (res.status === 200) {
      const data = await res.json();

      const {
        canonical_url,
        cook_time,
        ingredients,
        instructions_list,
        nutrients,
        prep_time,
        title,
        yields,
      } = data;

      console.log(data);

      // const formattedData = {
      //   title,
      //   ingredients,
      //   instructions: instructions_list,
      //   nutrients,
      //   yields,
      //   prepTime: prep_time,
      //   cookTime: cook_time,
      //   url: canonical_url,
      // }

      // console.log(formattedData);

      // if (!formattedData) {
      //   setSubmitError("Unable to obtain recipe data from the URL");
      // } else {
      //   handleResponse(formattedData);
      // }

      handleResponse({
        title,
        ingredients,
        instructions: instructions_list,
        nutrients,
        yields,
        prepTime: prep_time,
        cookTime: cook_time,
        url: canonical_url,
      });
    } else if (res.status === 400) {
      const errText = await res.text();
      setInputError(errText);
    } else {
      const errText = await res.text();
      setSubmitError(errText);
    }
    setIsLoading(false);
  }

  return (
    <form id="recipe-scraping-form" className={variant} onSubmit={handleSubmit}>
      {/* <div id="rsf-input-wrapper"> */}
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
      {/* {inputError.isShowing && <ErrBubble msg={inputError.msg} />} */}
      {/* </div> */}
      <button className="btn-main" type="submit">
        Get Recipe
      </button>
      {isLoading && <Spinner />}
      {submitError && (
        <Alert id="rsf-submit-error" severity="error">
          {submitError}
        </Alert>
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
