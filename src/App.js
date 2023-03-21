import './App.css'
import './Header'
import Header from './Header';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />     
        <main>
          <div>
            <p>Meal prepping on a bulk just got easier.</p>
            <input type="text" id="url-input" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
