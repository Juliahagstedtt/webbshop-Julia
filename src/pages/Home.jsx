import { Link } from "react-router";

function Home() {
    return(
        <>
        <div>
            <h1>Hem sidan!</h1>

        <Link to={"/Products"}>
            <button>Produkter
            </button>
        </Link>
        </div>
        </>
    );
}

export default Home;