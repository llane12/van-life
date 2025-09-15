import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function HostVanPhotos() {
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

    // TOOD: Vans only have 1 photo
    const vanPhotoUrls = [van ? van.imageUrl : ""];

    const photoElements = vanPhotoUrls.map(imageUrl =>
        <li key={imageUrl} className="host-van-detail-photos-img-container">
            <img className="host-van-detail-photos-img" src={imageUrl} alt="Van photo" />
        </li>
    );

    return van ? (
        <>
            <ul className="host-van-detail-photos-list">
                {photoElements}
            </ul>
        </>
    ) : <h2>Loading...</h2>;
}
