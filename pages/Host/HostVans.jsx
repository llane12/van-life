import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getHostAllVans } from "./api";
import "./host.css";

export default function HostVans() {
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // TOOD: Hard-coded host Id
    const hostId = "123";

    useEffect(() => {
        async function getVans() {
            try {
                const data = await getHostAllVans(hostId);
                setVans(data);
                setError(null);
            } catch (err) {
                console.log(err);
                setError(err);
            }
            setLoading(false);
        }
        getVans();
    }, []);

    const vanElements = vans.map(van => (
        <Link key={van.id} to={van.id} className="host-van-link">
            <li className="host-van-card">
                <div className="host-van-card-img-container">
                    <img src={van.imageUrl} className="host-van-card-img" />
                </div>
                <div className="host-van-card-data">
                    <p className="host-van-card-name">{van.name}</p>
                    <p className="host-van-price">{`$${van.price}/day`}</p>
                </div>
            </li>
        </Link>
    ));

    function renderPlaceholder() {
        if (loading) {
            return <h2 aria-live="polite">Loading...</h2>;
        } else if (error) {
            return <h2 aria-live="assertive">Unable to load van details</h2>;
        } else {
            return null;
        }
    }

    return (
        <div className="host-vans-container">
            <div className="host-vans-content">
                <h1>Your listed vans</h1>
                <ul className="host-vans-list">
                    {renderPlaceholder() ?? vanElements}
                </ul>
            </div>
        </div>
    );
}
