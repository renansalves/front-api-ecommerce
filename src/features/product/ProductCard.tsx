import { centsStringToBRL } from "./money";
import type { Product } from "./ProductType";
import { addItemToCart } from "../cart/CartService";

type Props = {
  product: Product;
  categoryName?: string;
  onAddToCart?: (p: Product) => void;
};

export function ProductCard({ product, categoryName, onAddToCart }: Props) {
  async function handleAddToCart() {
    try {
      const quantity = 1;
      await addItemToCart({ productId: (product as any).id, quantity });
      onAddToCart?.(product);
    } catch (e: any) {
      console.error("Falha ao adicionar ao carrinho:", e?.message ?? e);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4 flex flex-col gap-2">
      {/* Imagem/placeholder */}
      <div className="h-32 w-full rounded bg-gray-100" />

      <div className="text-xs text-gray-500">{categoryName ?? "—"}</div>

      <a href={`/product/${product.id}`} className="block text-base font-medium hover:underline">
        {product.name}
      </a>

      <div className="text-sm text-gray-900">
        {centsStringToBRL(product.priceCents, (product as any).currency ?? "BRL")}
      </div>

      <button
        className="mt-2 rounded bg-indigo-600 px-3 py-1.5 text-white text-sm"
        onClick={handleAddToCart}
      >
        Add ao carrinho
      </button>
    </div>
  );
}

export { centsStringToBRL };
