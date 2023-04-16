import { Route, Routes } from "react-router-dom";
import Splash from "./routes/Splash";
import Dashboard from "./routes/Dashboard";
import Import from "./routes/Import";
import Create from "./routes/Create";
import Recipes from "./routes/Recipes";
import Recipe from "./routes/Recipe";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Import />} />
          <Route path="import" element={<Import />} />
          <Route path="create" element={<Create />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:id" element={<Recipe />} />
        </Route>
      </Routes>
    </div>
  );
}
