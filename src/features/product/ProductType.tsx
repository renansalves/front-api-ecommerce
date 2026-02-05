// src/features/product/product.types.ts
export type Product = {
  id: string;             // era number inseguro -> string
  sku: string;
  name: string;
  priceCents: string;     // era number inseguro -> string
  categoryId: string;     // era number inseguro -> string
  stockQuantity: number;  // 32 bits cabe como number
  currency: string;
  active: boolean;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: string; // potencialmente enorme -> string
  totalPages: string;    // potencialmente enorme -> string
  number: number;        // página atual (0-based) - use conforme API
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  // campos extra do Spring que você pode ignorar na UI:
  numberOfElements?: number;
  sort?: any;
  pageable?: any;
};
