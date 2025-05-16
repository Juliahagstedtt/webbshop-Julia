import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCATpmRr66Dz2-LwNL3n-i64VkXPVxaNd0",
  authDomain: "barbie-webbshop.firebaseapp.com",
  projectId: "barbie-webbshop",
  storageBucket: "barbie-webbshop.appspot.com", 
  messagingSenderId: "359627353856",
  appId: "1:359627353856:web:f524c424eaff3e73fc8de5",
  measurementId: "G-XP3HF5KWQZ"
};

const app = initializeApp(firebaseConfig); 
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function fetchProducts() {
  const productsCol = collection(db, "products");
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function deleteProductFromFirestore(id) {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Misslyckades att radera produkt", error);
    throw error;
  }
}

export { db };