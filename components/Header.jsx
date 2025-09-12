import { Link } from "react-router-dom";

import "./header.css";

export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/" className="link-home">#VANLIFE</Link>
                <Link to="/about" className="link-page">About</Link>
                <Link to="/vans" className="link-page">Vans</Link>
            </nav>
        </header>
    );
}
