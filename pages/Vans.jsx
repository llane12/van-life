import { useState, useEffect } from "react";

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

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const tags = ["simple", "rugged", "luxury"];
    const tagsElements = tags.map(tag => (
        <button className={"van-tag " + tag}>{capitalizeFirstLetter(tag)}</button>
    ));

    const vansElements = vans.map(van => (
        <li key={van.id} className="van-card">
            <img src={van.imageUrl} className="van-img" />
            <div className="van-card-data">
                <div className="van-card-data-left">
                    <p className="van-card-name">{van.name}</p>
                    <p className={"van-tag active " + van.type}>{capitalizeFirstLetter(van.type)}</p>
                </div>
                <div className="van-card-data-right">
                    <p className="van-price">{"$" + van.price}</p>
                    <p className="van-price-duration">{"/day"}</p>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="vans-container">
            <div className="vans-content">
                <h1>Explore our van options</h1>
                <div className="tags-container">
                    {tagsElements}
                    <button className="btn-clear-filters">Clear filters</button>
                </div>
                <ul className="vans-list">
                    {vansElements}
                </ul>
            </div>
        </div>
    )
}