import './RecipeScrapingForm.css';
import { useState } from "react";
import TextInput from './TextInput';
import ErrMsg from './ErrMsg';
import Button from './Button';
import formatScrapedRecipe from './utils/formatScrapedRecipe';
import isValidHttpURL from './utils/isValidHttpURL';

export default function ScrapeRecipeForm() {
  const [urlInputErr, setURLInputErr] = useState({ isShowing: false, msg: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    let inputString = e.target.querySelector('input').value;
    
    if(!isValidHttpURL(inputString)){
      setURLInputErr({ isShowing: true, msg: 'Please paste a valid recipe URL' });
      return false;
    } 
    
    let res = await fetch(`http://localhost:8000/recipe-data?url=${inputString}`);

    if(res.status === 200){
      setURLInputErr({ isShowing: false, msg: ' '});
      let data = await res.json();
      console.log(formatScrapedRecipe(data));
    } else {
      setURLInputErr({ isShowing: true, msg: 'Something went wrong. Please try a different url' });
    }
  }

  return ( 
    <form id='recipe-scraping-form' onSubmit={handleSubmit}>
      <TextInput />
      <ErrMsg isShowing={urlInputErr.isShowing} msg={urlInputErr.msg} />
      <Button text='Get Recipe' />
    </form>
  );
}
