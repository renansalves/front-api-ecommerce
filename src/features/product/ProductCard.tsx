import { centsStringToBRL } from "./money";
import type { Product } from "./ProductType";
import { addItemToCart } from "../cart/CartService"; // <— importa o serviço

type Props = {
  product: Product;
  categoryName?: string;
  onAddToCart?: (p: Product) => void;
};

export function ProductCard({ product, categoryName, onAddToCart }: Props) {
  // Figma sugere hover e destaque visual no card ao passar o mouse
  return (
    <div className="group relative flex flex-col rounded-xl border bg-white p-4 shadow-sm ring-1 ring-gray-200 transition hover:shadow-lg">
      {/* Imagem: a API ainda não traz; usamos um placeholder */}
      <div className="mb-3 aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100">
        {/* Placeholder com gradiente */}
        <div className="h-full w-full bg-linear-to-br from-gray-100 via-gray-200 to-gray-100" />
      </div>

      await addItemToCart({
        productId: (product as any).id,
        quantity,
      });

      onAddToCart?.(product);

    } catch (e: any) {
      console.error("Falha ao adicionar ao carrinho:", e?.message ?? e);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 aspect-square w-full rounded-md bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="text-xs text-gray-500">{categoryName ?? "—"}</div>
      <h4 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h4>
      <div className="mt-2 text-base font-semibold text-gray-900">
        {centsStringToBRL(product.priceCents, (product as any).currency ?? "BRL")}
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-3 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Adiciona ao carrinho
      </button>
    </div>
  );
}

export { centsStringToBRL };
