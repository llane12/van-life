import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function HostVanPricing() {
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

    function formatPrice(price) {
        const priceInt = parseInt(price);
        if (isNaN(priceInt)) {
            return price;
        }
        return priceInt.toFixed(2);
    }

    return van ? (
        <>
            <div className="host-van-detail-pricing">
                <p><span>${formatPrice(van.price)}</span>/day</p>
            </div>
        </>
    ) : <h2>Loading...</h2>;
}
