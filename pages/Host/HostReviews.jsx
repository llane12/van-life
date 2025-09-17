import { useState, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";

import reviewsImageUrl from "../../assets/images/reviews.png";
import { getHostAllReviews } from "./api";
import "./host.css";

export default function HostReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // TOOD: Hard-coded host Id
    const hostId = "123";

    useEffect(() => {
        async function getTransactions() {
            try {
                const data = await getHostAllReviews(hostId);
                setReviews(data);
                setError(null);
            } catch (err) {
                console.log(err);
                setError(err);
            }
            setLoading(false);
        }
        getTransactions();
    }, []);

    function makeStars(rating) {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<Star key={i} />)
        }
        return <>{stars}</>
    }

    const reviewElements = reviews.map(review => (
        <li key={review.id} className="host-reviews-review-card">
            <div className="host-reviews-review-card-stars">
                {makeStars(review.rating)}
            </div>
            <p className="host-reviews-review-card-title">{review.name} <span>{review.date}</span></p>
            <p className="host-reviews-review-card-text">{review.text}</p>
            <hr />
        </li>
    ));

    function renderPlaceholder() {
        if (loading) {
            return <h2 aria-live="polite">Loading...</h2>;
        } else if (error) {
            return <h2 aria-live="assertive">Unable to load transactions</h2>;
        } else {
            return null;
        }
    }

    return (
        <div className="host-reviews-container">
            <div className="host-reviews-title-container">
                <h1>Your reviews</h1>
                <p className="host-reviews-period">Last <span>30 days</span></p>
            </div>
            <div className="host-reviews-rating-container">
                <p className="host-reviews-rating-score">4.5</p>
                <div className="host-reviews-rating-stars"><Star /><Star /><Star /><Star /><StarHalf /></div>
                <p className="host-reviews-rating-sub">overall rating</p>
            </div>
            <img src={reviewsImageUrl} />
            <p className="host-reviews-review-title">Reviews {(loading || error) ? "" : `(${reviews.length})`}</p>
            <ul className="host-reviews-review-list">
                {renderPlaceholder() ?? reviewElements}
            </ul>
        </div>
    );
}
