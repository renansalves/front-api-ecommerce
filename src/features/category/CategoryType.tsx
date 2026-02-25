export type Category = {
  id: number;
  name: string;
  description: string | null;
};

export type CategoryPage = {
  content: Category[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
