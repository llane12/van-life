import { NavLink } from "react-router-dom";

import "./header.css";

export default function Header() {
    return (
        <header>
            <nav className="nav-header">
                <NavLink to="/van-life/" className="link-home">#VANLIFE</NavLink>
                <NavLink to="/van-life/host" className={link => link.isActive ? "link-page active" : "link-page"}>Host</NavLink>
                <NavLink to="/van-life/about" className={link => link.isActive ? "link-page active" : "link-page"}>About</NavLink>
                <NavLink to="/van-life/vans" className={link => link.isActive ? "link-page active" : "link-page"}>Vans</NavLink>
            </nav>
        </header>
    );
}
