import Layout from "./layouts/Layout";
import { Navigate, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./contexts/AppContext";
import LayoutIn from "./layouts/LayoutIn";
import Banner from "./components/Banner";
import RectangleVisualization from "./components/RectangleVisualization";
import DateTimePHVisualization from "./components/DateTimePHVisualization";
import DateTimePHMVVisualization from "./components/DateTimePHMVVisualization";
import PhPhmvTemperatureVisualization from "./components/PhPhmvTemperatureVisualization";
import PhTemperatureVisualization from "./components/pHTemperatureVisualization";
import PhPhmvVisualization from "./components/PhPhmvVisualization";
import ProtectedRoute from "./contexts/ProtectedRoute";

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
              <Banner />
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



      <Route element={<ProtectedRoute />}>
        <Route
          path="/prev1"
          element={
            <LayoutIn showHero>
              <RectangleVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/datetime-ph1"
          element={
            <LayoutIn showHero>
              <DateTimePHVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/datetime-phmv1"
          element={
            <LayoutIn showHero>
              <DateTimePHMVVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/pHmvTemperature-visualization1"
          element={
            <LayoutIn showHero>
              <PhPhmvTemperatureVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/pHmv-visualization1"
          element={
            <LayoutIn showHero>
              <PhPhmvVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/pHTemperature-visualization1"
          element={
            <LayoutIn showHero>
              <PhTemperatureVisualization />
            </LayoutIn>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
