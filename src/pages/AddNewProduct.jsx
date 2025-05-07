import { Link } from "react-router";

import '../styles/AddNewProduct.css'

function AddNewProduct() {
    return(
        <>
        <div>

        <Link to={"/admin"}>
            <button className="admin-button"> Ändra Produkt
            </button>
        </Link>            
        
        <Link to={"/addnewproduct"}>
            <button className="admin-button"> Lägg till Produkt
            </button>
        </Link> 


        <div className="add-new">
            <input placeholder="Titel"></input>
            <input placeholder="Beskrivning"></input>
            <input placeholder="Pris"></input>
            <input></input>

            <Link to={"/admin"}>
                <button className="add-button">Lägg till produkt
            </button>
        </Link>  

        </div>

   

            {/* <img src={barbie2} alt="barbie1" className="barbi-img2"/> */}
        </div>
        </>
    );
}

export default AddNewProduct;        