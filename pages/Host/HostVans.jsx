import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/text";
import "./host.css";

export default function HostVans() {
    const [vans, setVans] = useState([]);

    // TOOD: Hard-coded host Id
    const hostId = "123";

    useEffect(() => {
        fetch(`/api/host/${hostId}/vans`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch vans");
                }
                return res.json();
            })
            .then(data => setVans(data.vans))
            .catch(error => console.log("Error fetching data: " + error));
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

    return (
        <div className="host-vans-container">
            <div className="host-vans-content">
                <h1>Your listed vans</h1>
                <ul className="host-vans-list">
                    {vanElements}
                </ul>
            </div>
        </div>
    );
}
