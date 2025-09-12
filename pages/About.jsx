import LinkButton from "../components/LinkButton"
import bgImg from "../assets/images/about-hero.png"
import "./about.css"

export default function About() {
    return (
        <div className="about-container">
            <img src={bgImg} className="about-hero-image" />
            <div className="about-content">
                <p className="about-header">Don’t squeeze in a sedan when you could relax in a van.</p>
                <p className="about-text">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                    <br />
                    (Hitch costs extra 😉)</p>
                <p className="about-text">Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                <div className="card">
                    <p className="card-header">
                        Your destination is waiting.<br />Your van is ready.
                    </p>
                    <LinkButton to="/van-life/vans" className="card-button" color="black" variant="rounded">Explore our vans</LinkButton>
                </div>
            </div>
        </div>
    )
}