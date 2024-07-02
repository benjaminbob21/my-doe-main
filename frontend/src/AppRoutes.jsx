import Layout from "./layouts/Layout";
import { Navigate, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./contexts/AppContext";
import LayoutIn from "./layouts/LayoutIn";
import Banner from "./components/Banner";

const AppRoutes = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <LayoutIn showHero>
              <App />
            </LayoutIn>
          ) : (
            <Layout showHero Home>
              <Banner/>
            </Layout>
          )
        }
      ></Route>
      <Route
        path="sign-in"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      ></Route>
      <Route
        path="sign-up"
        element={
          <Layout Home>
            <Register />
          </Layout>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default AppRoutes;
