import { Link } from "react-router";
import '../styles/Home.css'
import barbie1 from '../assets/barbie1.jpg';
import barbie2 from '../assets/barbie2.jpg';


function Home() {
    return(
        <>
        <div>
            <h1 className="home-text">Välommen till BarbieToys!</h1>
            <h2>Fortsätt för att se mer av våra produkter här</h2>
        <Link to={"/Products"}>
            <button className="product-button">Produkter
            </button>
        </Link>            
        
        <img src={barbie1} alt="barbie1" className="barbi-img1"/>

            {/* <img src={barbie2} alt="barbie1" className="barbi-img2"/> */}
        </div>
        </>
    );
}

export default Home;        