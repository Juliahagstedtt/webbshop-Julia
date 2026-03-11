import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zmoafenpxyxkzbsswbfj.supabase.co";
const supabaseKey = "sb_publishable_amphEbNubMqLqnaZLxLChA_pa-zNZlt";

export const supabase = createClient(supabaseUrl, supabaseKey);
export async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data.filter(p => !p.isDeleted);
}