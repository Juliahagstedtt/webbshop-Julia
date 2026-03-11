import { supabase } from "../config/superbase";

// Hämta alla produkter
export async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Fel vid hämtning:", error);
    return [];
  }
  return data.filter(p => !p.isDeleted);
}

// Radera produkt
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) console.error("Fel vid borttagning:", error);
}

// Uppdatera produkt
export async function updateProduct(id, product) {
  const { error } = await supabase.from("products").update(product).eq("id", id);
  if (error) console.error("Fel vid uppdatering:", error);
}