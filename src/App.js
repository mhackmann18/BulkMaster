import { Route, Routes } from "react-router-dom";
import Splash from "./Splash";
import Import from "./Import";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/import" element={<Import />} />
      </Routes>
    </div>
  );
}
