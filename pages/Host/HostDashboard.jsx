import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Star, StarHalf } from 'lucide-react';

import { getHostAllVans } from "./api";
import "./host.css";

export default function HostDashboard() {
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
        <li key={van.id} className="host-dash-van-card">
            <div className="host-dash-van-card-img-container">
                <img className="host-dash-van-card-img" src={van.imageUrl} />
            </div>
            <div className="host-dash-van-card-data-container">
                <p>{van.name}</p>
                <p>{`$${van.price}/day`}</p>
            </div>
            <NavLink to={`vans/${van.id}`} className="host-dash-nav-link">Edit</NavLink>
        </li>
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
        <div className="host-dash-container">
            <div className="host-dash-income-card">
                <div className="host-dash-income-card-data">
                    <p>Welcome!</p>
                    <p>Income last <span>30 days</span></p>
                    <p>$2,260</p>
                </div>
                <NavLink to="income" className="host-dash-nav-link">Details</NavLink>
            </div>
            <div className="host-dash-review-card">
                <span>Reivew score</span>
                <div className="host-dash-review-stars"><Star /><Star /><Star /><Star /><StarHalf /></div>
                <span>4.5</span>
                <NavLink to="reviews" className="host-dash-nav-link">Details</NavLink>
            </div>
            <div className="host-dash-vans-card">
                <span>Your listed vans</span>
                <NavLink to="vans" className="host-dash-nav-link">View all</NavLink>
            </div>
            <ul className="host-dash-vans-list">
                {renderPlaceholder() ?? vanElements}
            </ul>
        </div>
    );
}
