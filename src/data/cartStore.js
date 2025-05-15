import { create } from 'zustand';
import products from './products';

export const useCartStore = create((set) => ({
  items: [],
  // cart: [],

  addToCart: (product) => set((state) => {
      const existingItem = state.items.find((p) => p.id === product.id);

      if (existingItem) {

        return {
          items: state.items.map(item => 
            item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
          ),
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }
    }),

    decreaseQuantity: (id) =>
      set((state) => ({
        items: state.items
        .map((item) =>
        item.id === id
        ? { ...item, quantity: Math.max (item.quantity - 1, 0) } : item
        )
        .filter((item) => item.quantity > 0),
      })),


  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId),
  })),

  clearCart: () => set({ items: [] }),
}));