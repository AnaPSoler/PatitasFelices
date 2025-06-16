import { Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
