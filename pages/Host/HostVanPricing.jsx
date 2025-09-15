import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
    const van = useOutletContext();

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
