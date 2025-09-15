import { useOutletContext } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/text";

export default function HostVanDetail() {
    const van = useOutletContext();

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
