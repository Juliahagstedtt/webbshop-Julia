import { Link } from "react-router";
import '../styles/Home.css'
import barbie1 from '../assets/barbie1.jpg';

// Hemsidan
function Home() {
    return(
        <>
        <div className="home-container">
            <h1 className="home-text">Välkommen till BarbieToys!</h1>

        <div className="home-info">
        <p>Upptäck en magisk värld av Barbies, drömslott, bilar och massor av tillbehör. Här finns något för varje fantasi! Bläddra bland våra produkter och hitta dina nya favoriter! Fortsätt för att se mer av våra produkter här.</p>
          <Link to={"/Products"}>
            <button className="product-button">Leksaker
            </button>
        </Link>       
        </div>
        
        <img src={barbie1} alt="barbie1" className="barbi-img1"/>
        </div>
        </>
    );
}

export default Home;        