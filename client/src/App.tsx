import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Contact from "./components/pages/home/contact";
import Deal from "./components/pages/home/Deal";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/"
          element={
            <HomeLayout>
              <Outlet />
            </HomeLayout>
          }
        >
          <Route path="contact" element={<Contact />} />
          <Route path="deal" element={<Deal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
