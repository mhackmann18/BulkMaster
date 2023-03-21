import './App.css'
import Banner from './Banner';
import Button from './Button';
import URLInput from './URLInput';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Banner />     
        <main>
          <div>
            <p>Meal prepping on a bulk<br></br> just got easier.</p>
            <URLInput />
            <Button text='Get Recipe' onClick={()=>{console.log('Get recipe')}}/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
