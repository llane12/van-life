import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
    const van = useOutletContext();

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
