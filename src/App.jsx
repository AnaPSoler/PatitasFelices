import { Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FooterC from "./components/footer/FooterC";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Page404 from "./pages/page404";

function App() {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<Page404 />}/>
      </Routes>      
      <FooterC />
    </>
  );
}

export default App;
