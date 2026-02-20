export type Product = {
  id: string;
  sku: string;
  name: string;
  priceCents: string;
  categoryId: string;
  stockQuantity: number;
  currency: string;
  active: boolean;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: string;
  totalPages: string;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements?: number;
  sort?: any;
  pageable?: any;
};
