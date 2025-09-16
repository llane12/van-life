import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/Layout";

export default function Account() {
    const [submitting, setSubmitting] = useState(false);
    const { user, logout } = useContext(UserContext);

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        setSubmitting(false);
        navigate("/van-life");
    }

    return (
        <div className="login-container">
            <h1>My account</h1>
            <h4><span>Email:</span> {user.email}</h4>
            <h4><span>Name:</span> {user.name}</h4>
            <button onClick={handleLogout} disabled={submitting}>{submitting ? "Logging out..." : "Logout"}</button>
        </div>
    );
}
