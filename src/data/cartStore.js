import { create } from 'zustand';
import products from './products';

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) =>
      set((state) => {
        const alreadyInCart = state.cart.find((p) => p.id === product.id);
        if (alreadyInCart) return state; 
        return { cart: [...state.cart, product] };
      }),
    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter((p) => p.id !== id)
      })),
  }));