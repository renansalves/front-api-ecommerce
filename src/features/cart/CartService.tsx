
import { axiosDef } from "../../services/axiosDef";
import type { AddCartItemRequest, CartResponse } from "./CartTypes";

export async function addItemToCart(
  payload: AddCartItemRequest
): Promise<CartResponse> {
  const body = {
    productId:
      typeof payload.productId === "number"
        ? String(payload.productId)
        : payload.productId,
    quantity:
      typeof payload.quantity === "number"
        ? String(payload.quantity)
        : payload.quantity,
  };

  const { data } = await axiosDef.post<CartResponse>("/api/cart/items", body);
  return data;
}
