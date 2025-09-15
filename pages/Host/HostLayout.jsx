import { Outlet, NavLink } from "react-router-dom";

import "./host.css";

export default function HostLayout() {
    return (
        <>
            <nav className="nav-host">
                <NavLink to="/van-life/host" end className={link => link.isActive ? "host-link active" : "host-link"}>Dashboard</NavLink>
                <NavLink to="/van-life/host/income" className={link => link.isActive ? "host-link active" : "host-link"}>Income</NavLink>
                <NavLink to="/van-life/host/vans" className={link => link.isActive ? "host-link active" : "host-link"}>Vans</NavLink>
                <NavLink to="/van-life/host/reviews" className={link => link.isActive ? "host-link active" : "host-link"}>Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    );
}
