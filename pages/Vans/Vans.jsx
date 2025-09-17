import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/text";
import { getAllVans } from "./api";
import "./vans.css";

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const typeFilter = searchParams.get("type");

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getAllVans();
                setVans(data);
                setError(null);
            } catch (err) {
                console.log(err);
                setError(err);
            }
            setLoading(false);
        }

        loadVans()
    }, []);

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    const tags = ["simple", "rugged", "luxury"];
    const tagElements = tags.map(tag => (
        <button
            key={tag}
            onClick={() => handleFilterChange("type", tag)}
            className={`van-tag ${tag} ${typeFilter === tag ? "active" : ""}`}
        >{capitalizeFirstLetter(tag)}</button>
    ));

    const filteredVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans;
    const vanElements = filteredVans.map(van => (
        <Link key={van.id} to={van.id} state={{ queryString: "?" + searchParams.toString(), type: typeFilter }} className="van-link">
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

    function renderPlaceholder() {
        if (loading) {
            return <h2 aria-live="polite">Loading...</h2>;
        } else if (error) {
            return <h2 aria-live="assertive">There was an error: {error.message}</h2>;
        } else {
            return null;
        }
    }

    return (
        <div className="vans-container">
            <div className="vans-content">
                <h1>Explore our van options</h1>
                <div className="tags-container">
                    {tagElements}
                    {typeFilter && <button onClick={() => handleFilterChange("type", null)} className="btn-clear-filters">Clear filters</button>}
                </div>
                <ul className="vans-list">
                    {renderPlaceholder() ?? vanElements}
                </ul>
            </div>
        </div>
    );
}
