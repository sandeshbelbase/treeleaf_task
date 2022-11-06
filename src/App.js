import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profiles" element={<Profiles />} />
    </Routes>
  );
}

export default App;
