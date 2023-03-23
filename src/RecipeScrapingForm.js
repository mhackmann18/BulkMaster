import './RecipeScrapingForm.css';
import { useState } from "react";
import TextInput from './TextInput';
import ErrMsg from './ErrMsg';
import Button from './Button';

export default function ScrapeRecipeForm() {
  const [urlInputErr, setURLInputErr] = useState({ isShowing: false, msg: '' });
  const [processInputFlag, setProcessInputFlag] = useState(false);

  async function getRecipeJSONFromURL(string) {
    if(!isValidHttpUrl(string)){
      setURLInputErr({ isShowing: true, msg: 'Please paste a valid recipe URL' });
      return false;
    } 
    
    let res = await fetch(`http://localhost:8000/recipe-data?url=${string}`);
    console.log(res);

    if(res.status === 200){
      setURLInputErr({ isShowing: false, msg: ' '});
      let data = await res.json();
      console.log(data);
    } else {
      setURLInputErr({ isShowing: true, msg: 'Something went wrong. Please try a different url' });
    }
  }

  return ( 
    <form id='recipe-scraping-form' action='GET'>
      <TextInput processInputFlag={processInputFlag} setProcessInputFlag={setProcessInputFlag} processInput={getRecipeJSONFromURL} />
      <ErrMsg isShowing={urlInputErr.isShowing} msg={urlInputErr.msg} />
      <Button text='Get Recipe' onClick={setProcessInputFlag} />
    </form>
  );
}

function isValidHttpUrl(string) {
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
