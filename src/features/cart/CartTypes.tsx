export type AddCartItemRequest = {
  productId: string | number;
  quantity: string | number;
};

export type CartItem = {
  itemId: string;
  productId: string;
  productName: string;
  quantity: string | number;
  unitPrice: string;
  subtotal: string;
};

export type CartResponse = {
  id: string;
  items: CartItem[];
  totalCents: string;
};
