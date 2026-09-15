import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  image: string;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
};

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      cart: [],
      addToCart: product =>
        set((state) => {
          const isAlreadyInCart = state.cart.some(item => item.id === product.id);
          if (isAlreadyInCart) {
            return state;
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: id =>
        set(state => ({
          cart: state.cart.filter(item => item.id !== id),
        })),
      updateQuantity: (id, action) =>
        set(state => ({
          cart: state.cart.map((item) => {
            if (item.id === id) {
              const newQuantity
                = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
              return { ...item, quantity: Math.max(1, newQuantity) };
            }
            return item;
          }),
        })),
    }),
    {
      name: 'shopping-cart-storage',
    },
  ),
);
