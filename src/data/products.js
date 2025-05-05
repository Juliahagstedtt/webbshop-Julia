import App from "../App";

const products = [
    {
      id: "1",
      name: "Barbie Stranddröm",
      price: 249,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1620229311266-fd8dcb7f030c?auto=format&fit=crop&w=600&q=80",
      description: "Barbie i färgglad baddräkt, redo för stranden."
    },
    {
      id: "2",
      name: "Barbie Veterinär",
      price: 299,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1620229309154-73e53c8cb0e0?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med veterinärutrustning och söta djur."
    },
    {
      id: "3",
      name: "Barbie Ballerina",
      price: 199,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1581579186988-16e6bdbcc3a5?auto=format&fit=crop&w=600&q=80",
      description: "Elegant ballerina-Barbie i rosa tyllkjol."
    },
    {
      id: "4",
      name: "Barbie Brandman",
      price: 279,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80",
      description: "Barbie som modig brandman, komplett med hjälm."
    },
    {
      id: "5",
      name: "Barbie Popstjärna",
      price: 289,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1571748980661-95b43a6d5d03?auto=format&fit=crop&w=600&q=80",
      description: "Glittrig popstjärne-Barbie med mikrofon."
    },
    {
      id: "6",
      name: "Barbie Astronaut",
      price: 349,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1603786870740-9b68a1ad35c6?auto=format&fit=crop&w=600&q=80",
      description: "Barbie i rymddräkt – redo för nya galaxer."
    },
    {
      id: "7",
      name: "Barbie Bagare",
      price: 229,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80",
      description: "Barbie som bakar med muffinsformar och ugn."
    },
    {
      id: "8",
      name: "Barbie Skidåkare",
      price: 269,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1549921296-3a3b3f5dfd30?auto=format&fit=crop&w=600&q=80",
      description: "Sportig Barbie med skidor och hjälm."
    },
    {
      id: "9",
      name: "Barbie Pilot",
      price: 299,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9b?auto=format&fit=crop&w=600&q=80",
      description: "Pilot-Barbie i uniform och kaptensmössa."
    },
    {
      id: "10",
      name: "Barbie Djurvän",
      price: 219,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1532635242-88f37c4f1db0?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med katt och hund, redo för lek."
    },
    {
      id: "11",
      name: "Barbie Frisör",
      price: 259,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1589712235271-f24a9bc60bd0?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med sax, fön och stylad frisyr."
    },
    {
      id: "12",
      name: "Barbie Surfare",
      price: 239,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1560179407-1c6a9f799b3d?auto=format&fit=crop&w=600&q=80",
      description: "Somrig Barbie med surfbräda och vågdräkt."
    },
    {
      id: "13",
      name: "Barbie DJ",
      price: 269,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1617055284567-7e78db57d9fa?auto=format&fit=crop&w=600&q=80",
      description: "Cool DJ-Barbie med hörlurar och mixerbord."
    },
    {
      id: "14",
      name: "Barbie Trädgårdsmästare",
      price: 199,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1582719364394-ea0aa497c3cc?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med vattenkanna och blomsterlåda."
    },
    {
      id: "15",
      name: "Barbie Dykare",
      price: 279,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1521151223502-123d601b5287?auto=format&fit=crop&w=600&q=80",
      description: "Barbie i dykardräkt med simfötter och mask."
    },
    {
      id: "16",
      name: "Barbie Doktor",
      price: 299,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1584466995380-4c8f61b58e1b?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med stetoskop och vita rocken."
    },
    {
      id: "17",
      name: "Barbie Fashionista",
      price: 249,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1581579187250-2a6b27aa2574?auto=format&fit=crop&w=600&q=80",
      description: "Barbie i trendiga kläder för modemedvetna."
    },
    {
      id: "18",
      name: "Barbie Gymnast",
      price: 259,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1581460164766-b81dba0cdb9d?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med gymnastikdräkt och balansstång."
    },
    {
      id: "19",
      name: "Barbie Konstnär",
      price: 239,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1582727461548-69d2f8792b31?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med staffli, pensel och färgpalett."
    },
    {
      id: "20",
      name: "Barbie Ryttare",
      price: 269,
      category: "Dockor",
      imageUrl: "https://images.unsplash.com/photo-1606925797301-dc3b5f2e7d58?auto=format&fit=crop&w=600&q=80",
      description: "Barbie med ridkläder och hjälm."
    }
  ];
  
  export default products;