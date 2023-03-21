import './App.css'
import './Banner'
import Banner from './Banner';
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
