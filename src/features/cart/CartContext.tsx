import React, { createContext, useCallback, useContext, useState } from "react";
import { addItemToCart } from "./CartService";

// Ajuste o tipo conforme seu CartResponse real
type CartItem = { itemId: string; productId: string; productName: string; quantity: string | number };
type CartResponse = { id: string; items: CartItem[]; totalCents: string };

type CartCtx = {
  cart: CartResponse | null;
  setCart: React.Dispatch<React.SetStateAction<CartResponse | null>>;
  addItemToCart: (productId: string | number, quantity: string | number) => Promise<void>;
};

const CartContext = createContext<CartCtx | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartResponse | null>(null);

  const addItem = useCallback(async (productId: string | number, quantity: string | number) => {
    const data = await addItemToCart({ productId, quantity });
    setCart(data);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addItemToCart: addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function useCartOptional(): CartCtx | undefined {
  return useContext(CartContext);
}
