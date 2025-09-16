import { useState, useEffect, createContext } from 'react'
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const UserContext = createContext()

export default function Layout() {
    const [user, setUser] = useState(null);
    const [authenticating, setAuthenticating] = useState(true);

    useEffect(() => {
        try {
            const retrieved = localStorage.getItem("userData");
            const userData = JSON.parse(retrieved);
            if (userData && userData.token === "Enjoy your van, here's your tokens."
                && userData.user && userData.user.id && userData.user.email && userData.user.name) {
                setUser(userData.user);
            }
        } catch (err) {
            console.log("Error retrieving user data: " + err);
        }
        setAuthenticating(false);
    }, []);

    function login(userData) {
        localStorage.setItem("userData", JSON.stringify(userData))
        setUser(userData.user);
    }

    function logout() {
        localStorage.removeItem("userData")
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ authenticating, user, login, logout }}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </UserContext.Provider>
    );
}

export { UserContext }
