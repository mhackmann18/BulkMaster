import { Route, Routes } from "react-router-dom";
import Splash from "./routes/Splash";
import Dashboard from "./routes/Dashboard";
import Import from "./routes/Import";
import Create from "./routes/Create";
import Library from "./routes/Library";
import Recipe from "./routes/Recipe";
import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Import />} />
          <Route path="import-recipe" element={<Import />} />
          <Route path="create-recipe" element={<Create />} />
          <Route path="recipe-library" element={<Library />} />
          <Route path="recipe-library/:id" element={<Recipe />} />
        </Route>
      </Routes>
    </div>
  );
}
