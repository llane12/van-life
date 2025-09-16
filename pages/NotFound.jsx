import LinkButton from "../components/LinkButton";

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">:-(</h1>
                <h1 className="not-found-title">Sorry, the page you were looking for was not found.</h1>
                <LinkButton to="/van-life" color="black" variant="normal">Go to Home</LinkButton>
            </div>
        </div>
    );
}
