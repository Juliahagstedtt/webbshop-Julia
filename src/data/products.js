import App from "../App";

const products = [
  {
    id: "1",
    name: "Barbie Stranddröm",
    price: 279,
    category: "Dockor",
    imageUrl: "https://images.mattel.net/image/upload/w_1292,f_auto,c_scale/shop-us-prod/files/f7m2xaazgacnlq90h4u1.jpg",
    description: "Barbie i färgglad baddräkt, redo för stranden.",
    stock: 10
  },
  {
    id: "2",
    name: "Barbie Veterinär",
    price: 299,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1620229309154-73e53c8cb0e0?auto=format&fit=crop&w=600&q=80",
    description: "Barbie med veterinärutrustning och söta djur.",
    stock: 10
  },
  {
    id: "3",
    name: "Barbie Ballerina",
    price: 199,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1581579186988-16e6bdbcc3a5?auto=format&fit=crop&w=600&q=80",
    description: "Elegant ballerina-Barbie i rosa tyllkjol.",
    stock: 10
  },
  {
    id: "4",
    name: "Barbie Brandman",
    price: 279,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80",
    description: "Barbie som modig brandman, komplett med hjälm.",
    stock: 10
  },
  {
    id: "5",
    name: "Barbie Popstjärna",
    price: 289,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1571748980661-95b43a6d5d03?auto=format&fit=crop&w=600&q=80",
    description: "Glittrig popstjärne-Barbie med mikrofon.",
    stock: 10
  },
  {
    id: "6",
    name: "Barbie Astronaut",
    price: 349,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1603786870740-9b68a1ad35c6?auto=format&fit=crop&w=600&q=80",
    description: "Barbie i rymddräkt – redo för nya galaxer.",
    stock: 10
  },
  {
    id: "7",
    name: "Barbie Bagare",
    price: 229,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80",
    description: "Barbie som bakar med muffinsformar och ugn.",
    stock: 10
  },
  {
    id: "8",
    name: "Barbie Skidåkare",
    price: 269,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1549921296-3a3b3f5dfd30?auto=format&fit=crop&w=600&q=80",
    description: "Sportig Barbie med skidor och hjälm.",
    stock: 10
  },
  {
    id: "9",
    name: "Barbie Pilot",
    price: 299,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9b?auto=format&fit=crop&w=600&q=80",
    description: "Pilot-Barbie i uniform och kaptensmössa.",
    stock: 10
  },
  {
    id: "10",
    name: "Barbie Djurvän",
    price: 219,
    category: "Dockor",
    imageUrl: "https://images.unsplash.com/photo-1532635242-88f37c4f1db0?auto=format&fit=crop&w=600&q=80",
    description: "Barbie med katt och hund, redo för lek.",
    stock: 10
  },

  // Kläder & Accessoarer (10 produkter)
  {
    id: "11",
    name: "Barbie Klänningsset",
    price: 129,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1569876835-ea8b6dfb4f7c?auto=format&fit=crop&w=600&q=80",
    description: "En vacker klänning för Barbie, perfekt för fest.",
    stock: 10
  },
  {
    id: "12",
    name: "Barbie Väska & Skor",
    price: 99,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1586260741-3a01f9b9c97c?auto=format&fit=crop&w=600&q=80",
    description: "En trendig väska och skor för Barbie.",
    stock: 10
  },
  {
    id: "13",
    name: "Barbie Solglasögon",
    price: 49,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1555654486-36f7e4f8042a?auto=format&fit=crop&w=600&q=80",
    description: "Solglasögon för Barbie, för den soliga dagen.",
    stock: 10
  },
  {
    id: "14",
    name: "Barbie Halsband",
    price: 59,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1587020580529-7e8c15d3242e?auto=format&fit=crop&w=600&q=80",
    description: "Ett elegant halsband för Barbie att bära.",
    stock: 10
  },
  {
    id: "15",
    name: "Barbie Hatt & Handskar",
    price: 79,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1604936326223-600a7ed0746c?auto=format&fit=crop&w=600&q=80",
    description: "En fin hatt och matchande handskar för Barbie.",
    stock: 10
  },
  {
    id: "16",
    name: "Barbie Regnjacka",
    price: 109,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1604936326223-600a7ed0746c?auto=format&fit=crop&w=600&q=80",
    description: "En regnjacka för Barbie att vara snygg i regnet.",
    stock: 10
  },
  {
    id: "17",
    name: "Barbie Sportkläder",
    price: 119,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1572192145360-b02de33ab8d4?auto=format&fit=crop&w=600&q=80",
    description: "Sportiga kläder för Barbie för en aktiv dag.",
    stock: 10
  },
  {
    id: "18",
    name: "Barbie Badkläder",
    price: 69,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1571637769-9ef98b50809c?auto=format&fit=crop&w=600&q=80",
    description: "Badkläder för Barbie, perfekt för sommaren.",
    stock: 10
  },
  {
    id: "19",
    name: "Barbie Skor & Strumpor",
    price: 49,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1591954111090-3c13db6f388b?auto=format&fit=crop&w=600&q=80",
    description: "En uppsättning skor och strumpor för Barbie.",
    stock: 10
  },  {
    id: "20",
    name: "Barbie Handväska",
    price: 89,
    category: "Kläder & Accessoarer",
    imageUrl: "https://images.unsplash.com/photo-1594092597742-90f0cb85e524?auto=format&fit=crop&w=600&q=80",
    description: "En stilren handväska för Barbie.",
    stock: 10
  },{
    id: "21",
    name: "Barbie Hus",
    price: 599,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1579824638121-2b01b86585db?auto=format&fit=crop&w=600&q=80",
    description: "Ett fantastiskt Barbie-hus med flera rum att inreda.",
    stock: 10
    },
    {
    id: "22",
    name: "Barbie Bil",
    price: 399,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1593097642545-2e0fa3124fa7?auto=format&fit=crop&w=600&q=80",
    description: "En sportig bil för Barbie att köra runt i.",
    stock: 10
    },
    {
    id: "23",
    name: "Barbie Häst & Sadel",
    price: 349,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1591225277669-c839cda2d8a5?auto=format&fit=crop&w=600&q=80",
    description: "Barbie kan rida på sin häst med sadel och tyglar.",
    stock: 10
    },
    {
    id: "24",
    name: "Barbie Båt",
    price: 449,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1568732234-8e9d61a2b681?auto=format&fit=crop&w=600&q=80",
    description: "En båt för Barbie att segla på vattnet.",
    stock: 10
    },
    {
    id: "25",
    name: "Barbie Cykel",
    price: 249,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1581300522412-b2c1c5d74096?auto=format&fit=crop&w=600&q=80",
    description: "En rosa cykel för Barbie att cykla på.",
    stock: 10
    },
    {
    id: "26",
    name: "Barbie Vattenskoter",
    price: 399,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1594962676129-58a90ed7a4d9?auto=format&fit=crop&w=600&q=80",
    description: "En vattenskoter för Barbie att åka på.",
    stock: 10
    },
    {
    id: "27",
    name: "Barbie Campingvagn",
    price: 499,
    category: "Barbie Livsstil",
    imageUrl: "https://images.unsplash.com/photo-1603422093929-c9a9b9efc4d1?auto=format&fit=crop&w=600&q=80",
    description: "En campingvagn för Barbie att resa med.",
    stock: 10
    },
    {
      id: "28",
      name: "Barbie Drömhus",
      price: 799,
      category: "Barbie Livsstil",
      imageUrl: "https://images.unsplash.com/photo-1604817108269-20c7de79e7b3?auto=format&fit=crop&w=600&q=80",
      description: "Det perfekta drömhuset för Barbie och hennes vänner.",
      stock: 5
    },
    {
      id: "29",
      name: "Barbie Ferrari",
      price: 799,
      category: "Barbie Livsstil",
      imageUrl: "https://images.unsplash.com/photo-1603388093014-ffcc6c88d1f2?auto=format&fit=crop&w=600&q=80",
      description: "Snygg rosa sportbil för Barbie – åk med stil i en lyxig Ferrari!",
      stock: 7
    },
    {
      id: "30",
      name: "Barbie Husvagn",
      price: 899,
      category: "Barbie Livsstil",
      imageUrl: "https://images.unsplash.com/photo-1593195881388-4f4d3a1be6ba?auto=format&fit=crop&w=600&q=80",
      description: "Stor rosa husvagn för Barbies äventyr – med plats för vänner och campingutrustning.",
      stock: 7
    }
  
  ];
  
  export default products;