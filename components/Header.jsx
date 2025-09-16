import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LogIn, CircleUserRound } from "lucide-react";

import { UserContext } from "./Layout";
import "./header.css";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header>
            <nav className="nav-header">
                <NavLink to="." className="link-home">#VANLIFE</NavLink>
                <NavLink to="host" className={link => link.isActive ? "link-page active" : "link-page"}>Host</NavLink>
                <NavLink to="about" className={link => link.isActive ? "link-page active" : "link-page"}>About</NavLink>
                <NavLink to="vans" className={link => link.isActive ? "link-page active" : "link-page"}>Vans</NavLink>
                <NavLink to={user !== null ? "account" : "login"} className={link => link.isActive ? "link-icon active" : "link-icon"}>
                    {user !== null ? <CircleUserRound /> : <LogIn />}
                </NavLink>
            </nav>
        </header>
    );
}
