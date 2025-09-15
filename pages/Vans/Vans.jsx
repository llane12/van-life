import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/text";
import "./vans.css";

export default function Vans() {
    const [vans, setVans] = useState([]);

    useEffect(() => {
        fetch("/api/vans")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch vans");
                }
                return res.json();
            })
            .then(data => setVans(data.vans))
            .catch(error => console.log("Error fetching data: " + error));
    }, []);

    const tags = ["simple", "rugged", "luxury"];
    const tagElements = tags.map(tag => (
        <button key={tag} className={"van-tag " + tag}>{capitalizeFirstLetter(tag)}</button>
    ));

    const vanElements = vans.map(van => (
        <Link key={van.id} to={`/van-life/vans/${van.id}`} className="van-link">
            <li className="van-card">
                <img src={van.imageUrl} className="van-img" />
                <div className="van-card-data">
                    <div className="van-card-data-left">
                        <p className="van-card-name">{van.name}</p>
                        <i className={"van-tag active " + van.type}>{capitalizeFirstLetter(van.type)}</i>
                    </div>
                    <div className="van-card-data-right">
                        <p className="van-price">{"$" + van.price}</p>
                        <p className="van-price-duration">{"/day"}</p>
                    </div>
                </div>
            </li>
        </Link>
    ));

    return (
        <div className="vans-container">
            <div className="vans-content">
                <h1>Explore our van options</h1>
                <div className="tags-container">
                    {tagElements}
                    <button className="btn-clear-filters">Clear filters</button>
                </div>
                <ul className="vans-list">
                    {vanElements}
                </ul>
            </div>
        </div>
    )
}