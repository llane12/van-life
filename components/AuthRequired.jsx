import { useContext } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import { UserContext } from "./Layout";

export default function AuthRequired() {
    const { authenticating, user } = useContext(UserContext);

    const location = useLocation();

    if (authenticating) {
        return <p>...</p>;
    }

    return user !== null
        ? <Outlet />
        : <Navigate to="/van-life/login" state={{ desiredPath: location.pathname, message: "Please login first" }} replace />;
}

// replace means the target page will replace the current page on the history stack, making the browser back button work as expected
