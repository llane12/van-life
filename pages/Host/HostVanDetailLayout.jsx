import { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { capitalizeFirstLetter } from "../../utils/text";
import { getHostVan } from "./api";

export default function HostVanDetailLayout() {
    const [van, setVan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    const vanId = params.id;

    // TOOD: Hard-coded host Id
    const hostId = "123";

    useEffect(() => {
        async function loadVan() {
            try {
                const data = await getHostVan(hostId, vanId);
                setVan(data);
                setError(null);
            } catch (err) {
                console.log(err);
                setError(err);
            }
            setLoading(false);
        }
        loadVan();
    }, [params]);

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
        <div className="host-van-detail-container">
            <div className="host-van-detail-content">
                <Link to="../vans" className="host-van-detail-back-link">
                    <ArrowLeft />
                    Back to all my vans
                </Link>
                {renderPlaceholder() ?? (
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
                        <Outlet context={van} />
                    </div>
                )}
            </div>
        </div>
    );
}
