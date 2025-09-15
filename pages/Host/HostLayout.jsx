import { Outlet, NavLink } from "react-router-dom";

import "./host.css";

export default function HostLayout() {
    return (
        <>
            <nav className="nav-host">
                <NavLink to="." end className={link => link.isActive ? "host-link active" : "host-link"}>Dashboard</NavLink>
                <NavLink to="income" className={link => link.isActive ? "host-link active" : "host-link"}>Income</NavLink>
                <NavLink to="vans" className={link => link.isActive ? "host-link active" : "host-link"}>Vans</NavLink>
                <NavLink to="reviews" className={link => link.isActive ? "host-link active" : "host-link"}>Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    );
}
