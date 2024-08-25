import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./AppContext";

const Notprotected = () => {
    const { isLoggedIn } = useAppContext();
    if (!isLoggedIn) {
      return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default Notprotected;
