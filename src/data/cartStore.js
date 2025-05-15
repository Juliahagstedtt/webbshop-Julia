import { create } from 'zustand';
import products from './products';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    }),


    removeFromCart: (product) =>
      set((state) => {
        const existing = state.cart.find((p) => p.id === product.id);
        if (!existing) return state;

        if (existing.quantity === 1) {
          return {
        cart: state.cart.filter((p) => p.id !== id),
        };
      } else {
        return {
          cart: state.cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1  } : p
          ),
        };

      }
      
      }),
  }));