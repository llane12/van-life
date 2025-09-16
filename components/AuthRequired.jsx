import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { UserContext } from "./Layout";

export default function AuthRequired() {
    const { authenticating, user } = useContext(UserContext);

    if (authenticating) {
        return <p>...</p>;
    }

    return user !== null
        ? <Outlet />
        : <Navigate to="/van-life/login" state={{ message: "Please login first" }} replace />;
}

// replace means the target page will replace the current page on the history stack, making the browser back button work as expected
