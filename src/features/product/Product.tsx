// src/features/product/product.api.ts
import { axiosDef } from "../../services/axiosDef";
import type { PageResponse } from "./ProductType";
import type { Product } from "./ProductType";

export type ProductFilters = {
  name?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function fetchProducts(
  page: number,
  size: number,
  filters: ProductFilters = {}
): Promise<PageResponse<Product>> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("size", String(size));
  if (filters.name && filters.name.trim() !== "") params.set("name", filters.name.trim());
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (typeof filters.minPrice === "number") params.set("minPrice", String(filters.minPrice));
  if (typeof filters.maxPrice === "number") params.set("maxPrice", String(filters.maxPrice));

  const { data } = await axiosDef.get<PageResponse<Product>>(`/api/products?${params.toString()}`);
  return data;
}


