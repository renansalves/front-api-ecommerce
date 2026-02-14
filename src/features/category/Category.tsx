import { axiosDef } from "../../services/axiosDef";
import type { CategoryPage } from "./CategoryType";

export async function fetchCategories(page = 0, size = 20): Promise<CategoryPage> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("size", String(size));
  const { data } = await axiosDef.get<CategoryPage>(`/api/categories?${params.toString()}`);
  return data;
}
``
