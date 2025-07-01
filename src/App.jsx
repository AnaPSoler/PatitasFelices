import { Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FooterC from "./components/footer/FooterC";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";
import AdminPage from "./pages/AdminPage";
import Patients from "./pages/Patients";
import Cart from "./pages/Cart";
import Plans from "./pages/Plans";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./components/PrivateRoute";
import UserShifts from "./pages/UserShifts";
import AdminShifts from "./pages/AdminShifts";
import PlanDetail from "./pages/PlanDetail";

function App() {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route
          path="/admin"
          element={
            <PrivateRoute rol="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <PrivateRoute rol="admin">
              <Patients />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/shifts"
          element={
            <PrivateRoute rol="admin">
              <AdminShifts />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute rol="usuario">
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/cart"
          element={
            <PrivateRoute rol="usuario">
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/plans"
          element={
            <PrivateRoute rol="usuario">
              <Plans />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/shifts"
          element={
            <PrivateRoute rol="user">
              <UserShifts />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/planes/:planId" element={<PlanDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <FooterC />
    </>
  );
}

export default App;
