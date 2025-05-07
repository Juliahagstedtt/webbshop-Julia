import { Link } from "react-router";
import '../styles/Admin.css'
import TrashCan from '../assets/TrashCan.png';
import Edit from '../assets/Edit.png';


function Admin() {
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

        <div className="existing-p-list">
        <p>Beskrivnin: rosa glitter m.m  Pris 199kr</p>


                <button className='trashcan'>
                    <img src={TrashCan} alt="trashcan" className="trashcan"/>
                </button>

                <button className='edit'>
                    <img src={Edit} alt="edit" className="edit"/>
                </button>

        </div>


        </div>
        </>
    );
}

export default Admin;    