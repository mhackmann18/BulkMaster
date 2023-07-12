import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AuthenticateBeforeRender from "./AuthenticateBeforeRender";
import NotAllowedIfLoggedIn from "./NotAllowedIfLoggedIn";
import UserContextProvider from "./UserContextProvider";
import Splash from "./routes/Splash";
import Dashboard from "./routes/Dashboard";
import Import from "./routes/Import";
import Create from "./routes/Create";
import Library from "./routes/Library";
import Settings from "./routes/Settings";
import Recipe from "./routes/Recipe";
import ImportedRecipe from "./routes/ImportedRecipe";
import Home from "./routes/Home";
import Features from "./routes/Features";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import disableInputScroll from "./utils/disableInputScroll";
import theme from "./theme/theme";
import "./App.css";
import "./theme/muiOverrides.css";

const SUPPRESSED_WARNINGS = [
  "MUI: Too many re-renders. The layout is unstable.\nTextareaAutosize limits the number of renders to prevent an infinite loop.",
];

const consoleWarn = console.error;

console.error = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleWarn(msg, ...args);
  }
};

export default function App() {
  // Stop number input value from changing on scroll for all number inputs
  disableInputScroll();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <NotAllowedIfLoggedIn>
                  <Splash />
                </NotAllowedIfLoggedIn>
              }
            >
              <Route path="" element={<Home />} />
              <Route
                path="search"
                element={<ImportedRecipe redirectTo="/" />}
              />
              <Route path="features" element={<Features />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <AuthenticateBeforeRender>
                  <Dashboard />
                </AuthenticateBeforeRender>
              }
            >
              <Route path="import-recipe" element={<Import />} />
              <Route
                path="import-recipe/search"
                element={
                  <ImportedRecipe redirectTo="/dashboard/import-recipe" />
                }
              />
              <Route path="create-recipe" element={<Create />} />
              <Route path="recipe-library" element={<Library />} />
              <Route path="recipe-library/:id/" element={<Recipe />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}
