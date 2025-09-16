import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginUser } from "./api";
import { UserContext } from "../../components/Layout";
import "./login.css";

export default function Login() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useContext(UserContext);

    const location = useLocation();
    const navigate = useNavigate();

    function handleLogin(formData) {
        const email = formData.get("email");
        const password = formData.get("password");

        setSubmitting(true);
        setError(null);

        loginUser({ email, password })
            .then(data => {
                setError(null);
                login(data);
                navigate("/van-life/host", { replace: true })
            }).catch(err => {
                setError(err);
            }).finally(() => {
                setSubmitting(false);
            })
    }

    return (
        <div className="login-container">
            {location?.state?.message && <h3 className="login-error">{location.state.message}</h3>}
            <h1>Login to your account</h1>
            {error?.message && <h3 className="login-error">{error.message}</h3>}
            <form action={handleLogin} className="login-form">
                <input name="email" type="email" placeholder="Email address" />
                <input name="password" type="password" placeholder="Password" />
                <button disabled={submitting}>{submitting ? "Logging in..." : "Login"}</button>
            </form>
        </div>
    );
}
