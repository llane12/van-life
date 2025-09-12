import LinkButton from "../components/LinkButton"
import "./home.css"

export default function Home() {
  return (
    <div className="container-center">
      <div className="home-container">
        <p className="home-header">You got the travel plans, we got the travel vans.</p>
        <p className="home-text">Add adventure to your life by joingin the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
        <div className="home-find-van">
          <LinkButton to="/van-life/vans" color="orange" variant="normal">Find your van</LinkButton>
        </div>
      </div>
    </div>
  )
}