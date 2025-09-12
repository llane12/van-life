import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import LinkButton from "../components/LinkButton";
import { capitalizeFirstLetter } from "../utils/text";
import "./vanDetail.css"

export default function VanDetail() {
    const [van, setVan] = useState(null);

    const params = useParams();
    const vanId = params.id;

    useEffect(() => {
        fetch(`/api/vans/${vanId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch van details");
                }
                return res.json();
            })
            .then(data => setVan(data.vans))
            .catch(error => console.log("Error fetching data: " + error));
    }, [params]);

    return (
        <div className="van-detail-container">
            <div className="van-detail-content">
                <Link to="/van-life/vans" className="van-detail-back-link">
                    <LuArrowLeft />
                    Back to all vans
                </Link>
                {van ? (
                    <>
                        <div className="van-detail-img-container">
                            <img src={van.imageUrl} className="van-detail-img" />
                        </div>
                        <i className={"van-tag active van-detail-tag " + van.type}>{capitalizeFirstLetter(van.type)}</i>
                        <p className="van-detail-name">{van.name}</p>
                        <p className="van-detail-price">${van.price}<span>/day</span></p>
                        <p className="van-detail-description">{van.description}</p>
                        <LinkButton color="orange" variant="normal">Rent this van</LinkButton>
                    </>
                ) : <h2>Loading...</h2>}
            </div>
        </div>
    );
}
