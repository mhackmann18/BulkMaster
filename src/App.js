import { Route, Routes } from "react-router-dom";
import Splash from "./routes/Splash";
import Dashboard from "./routes/Dashboard";
import RecipeScrapingForm from "./common/RecipeScrapingForm";
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
