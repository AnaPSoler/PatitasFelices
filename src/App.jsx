import { Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FooterC from "./components/footer/FooterC";
import MapSection from "./components/map/MapSection";

function App() {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <MapSection />
      <FooterC />
    </>
  );
}

export default App;
