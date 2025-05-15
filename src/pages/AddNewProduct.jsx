import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import '../styles/AddNewProduct.css'
import { db } from "../config/firebase";
import Joi from "joi";

// validering för formulär i lägg till ny produkt
const schema = Joi.object({
    title: Joi.string().min(2).required().messages({
        "string.empty": "Namn på produkt krävs",
        "string.min": "Produktnamnet måste vara minst 4 tecken"
    }),
    // category: Joi.object().min(3).required().message({
    //     "object.empty": "Välj kategori",
    //     "object.min": "Vänligen välj en kategori"
    // }),
    description: Joi.string().min(5).required().messages({
        "string.empty": "Beskrivning krävs",
        "string.min":  "Beskrivning måste vara minst 5 tecken"
    }),
    price: Joi.number().min(1).required().messages({
        "number.base": "Pris måste vara en siffra",
        "number.min": "Priset måste vara minst 1 siffra",
        "any.required": "Pris krävS"
    }),
    imageUrl: Joi.string().uri().required().messages({
        "string.empty": "Bild-URL krävs",
        "string.uri": "URL måste vara en giltig länk"
    }),
    category: Joi.string().min(2).required().messages({
      "string.empty": "Kategori krävs",
      "string.min": "Kategori måste vara minst 2 tecken"
    })
});
function AddNewProduct() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        category: ""
    });

    const [errors, setErrors] = useState({}); // Valideringsfel
    const navigate = useNavigate(); // Navigering efter inskickat formulär

const handleChange = (e) => {
    setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value 
    }));
  setErrors(prev => ({
    ...prev,
    [e.target.name]: ""
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

    const validation = schema.validate(formData, { abortEarly: false });
    if (validation.error) {
        // Vid fel, samla alla fel och visa dem
        const newErrors = {};
        validation.error.details.forEach(err => {
            newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        return;
    }

    try {
        // Spara produkten i Firestore
        await addDoc(collection(db, "products"), {
            ...formData,
            price: Number(formData.price), // Se till att pris är nummer
            isDeleted: false
        });
        navigate("/admin"); 
    } catch (err) {
        console.error("Fel vid tillägg", err);
    }
};

return (
    <div>
      <Link to={"/admin"}>
        <button className="admin-button">Ändra Produkt</button>
      </Link>
      <Link to={"/addnewproduct"}>
        <button className="admin-button">Lägg till Produkt</button>
      </Link>

      <form className="add-new">
        <input
          name="title"
          placeholder="Titel"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <input
        name="category"
        placeholder="Kategori"
        value={formData.category}
        onChange={handleChange}
      />
      {errors.category && <p className="error">{errors.category}</p>}

        <input
          name="description"
          placeholder="Beskrivning"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <input
          type="number"
          name="price"
          placeholder="Pris"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <input
          type="url"
          name="imageUrl"
          placeholder="Bild-URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

        <button className="add-button" onClick={handleSubmit}>Lägg till produkt
        </button>
      </form>
    </div>
  );
}

export default AddNewProduct;        