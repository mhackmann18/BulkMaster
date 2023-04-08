import { Route, Routes } from "react-router-dom";
import Splash from "./routes/Splash";
import Dashboard from "./routes/Dashboard";
import Import from "./routes/Import";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="import" element={<Import />} />
        </Route>
      </Routes>
    </div>
  );
}
