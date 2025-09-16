import { NavLink } from "react-router-dom";
import { LogIn, CircleUserRound } from "lucide-react";

import "./header.css";

export default function Header() {
    return (
        <header>
            <nav className="nav-header">
                <NavLink to="." className="link-home">#VANLIFE</NavLink>
                <NavLink to="host" className={link => link.isActive ? "link-page active" : "link-page"}>Host</NavLink>
                <NavLink to="about" className={link => link.isActive ? "link-page active" : "link-page"}>About</NavLink>
                <NavLink to="vans" className={link => link.isActive ? "link-page active" : "link-page"}>Vans</NavLink>
                <NavLink to="login" className={link => link.isActive ? "link-page active" : "link-page"}>
                    <LogIn />
                </NavLink>
            </nav>
        </header>
    );
}
