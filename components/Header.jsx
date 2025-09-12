import { Link } from "react-router-dom";

import "./header.css";

export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/van-life/" className="link-home">#VANLIFE</Link>
                <Link to="/van-life/about" className="link-page">About</Link>
                <Link to="/van-life/vans" className="link-page">Vans</Link>
            </nav>
        </header>
    );
}
