import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Splash from "./routes/Splash";
import Dashboard from "./routes/Dashboard";
import Import from "./routes/Import";
import Create from "./routes/Create";
import Library from "./routes/Library";
import Settings from "./routes/Settings";
import Recipe from "./routes/Recipe";
import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import disableInputScroll from "./utils/disableInputScroll";
import theme from "./theme";

export default function App() {
  // Stop number input value from changing on scroll for all number inputs
  disableInputScroll();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
            <Route path="recipe-library/:id/" element={<Recipe />} />
            <Route path="recipe-library/:id/edit" element={<Recipe edit />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}
