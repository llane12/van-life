import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/text";

export default function HostVanDetail() {
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

    return van ? (
        <>
            <div className="host-van-detail-text" >
                <p><span>Name:</span> {van.name}</p>
                <p><span>Category:</span> {capitalizeFirstLetter(van.type)}</p>
                <p><span>Description:</span> {van.description}</p>
                <p><span>Visibility:</span> Public</p>
            </div>
        </>
    ) : <h2>Loading...</h2>;
}
