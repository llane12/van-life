import { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import { capitalizeFirstLetter } from "../../utils/text";

export default function HostVanDetailLayout() {
    const [van, setVan] = useState(null);

    const params = useParams();
    const vanId = params.id;

    // TOOD: Hard-coded host Id
    const hostId = "123";

    useEffect(() => {
        fetch(`/api/host/${hostId}/vans/${vanId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch van details");
                }
                return res.json();
            })
            .then(data => {
                if (data && data.vans && data.vans.length === 1) {
                    setVan(data.vans[0]);
                }
            })
            .catch(error => console.log("Error fetching data: " + error));
    }, [params]);

    return (
        <div className="host-van-detail-container">
            <div className="host-van-detail-content">
                <Link to=".." relative="path" className="host-van-detail-back-link">
                    <LuArrowLeft />
                    Back to all my vans
                </Link>
                {van ? (
                    <div className="host-van-detail-card">
                        <div className="host-van-detail-card-header">
                            <div className="host-van-detail-img-container">
                                <img src={van.imageUrl} className="host-van-detail-img" />
                            </div>
                            <div className="host-van-detail-data-container">
                                <i className={"van-tag active host-van-detail-tag " + van.type}>{capitalizeFirstLetter(van.type)}</i>
                                <p className="host-van-detail-name">{van.name}</p>
                                <p className="host-van-detail-price"><span>${van.price}</span>/day</p>
                            </div>
                        </div>
                        <nav className="nav-host-van-detail">
                            <NavLink to="." end className={link => link.isActive ? "host-link active" : "host-link"}>Details</NavLink>
                            <NavLink to="pricing" className={link => link.isActive ? "host-link active" : "host-link"}>Pricing</NavLink>
                            <NavLink to="photos" className={link => link.isActive ? "host-link active" : "host-link"}>Photos</NavLink>
                        </nav>
                        <Outlet />
                    </div>
                ) : <h2>Loading...</h2>}
            </div>
        </div>
    );
}
