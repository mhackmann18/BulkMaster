import { Route, Routes } from "react-router-dom";
import Splash from "./Splash";
import Dashboard from "./Dashboard";
import RecipeScrapingForm from "./RecipeScrapingForm";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/" element={<RecipeScrapingForm />} />
        </Route>
      </Routes>
    </div>
  );
}
