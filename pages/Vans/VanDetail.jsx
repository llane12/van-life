import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import LinkButton from "../../components/LinkButton";
import { capitalizeFirstLetter } from "../../utils/text";
import { getVan } from "./api";
import "./vanDetail.css"

export default function VanDetail() {
    const [van, setVan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    const vanId = params.id;

    const location = useLocation();
    const queryString = location.state?.queryString || "";
    const filterType = location.state?.type || "all";

    useEffect(() => {
        async function loadVan() {
            try {
                const data = await getVan(vanId);
                console.log(data);
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
        <div className="van-detail-container">
            <div className="van-detail-content">
                <Link to={".." + queryString} relative="path" className="van-detail-back-link">
                    <LuArrowLeft />
                    Back to {filterType} vans
                </Link>
                {renderPlaceholder() ?? (
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
                )}
            </div>
        </div>
    );
}
