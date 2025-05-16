import { create } from "zustand";
import { deleteProductFromFirestore } from "../config/firebase";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  removeProduct: async (id) => {
    try {
      await deleteProductFromFirestore(id);
      set((state) => ({
        products: state.products.filter(product => product.id !== id)
      }));
    } catch (error) {
      console.error("Could not remove product:", error);
    }
  }
}));