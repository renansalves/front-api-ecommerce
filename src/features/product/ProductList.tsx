import { useCallback, useEffect, useMemo, useState } from "react";
import { Filter, type FilterValues } from "../../components/Filter";
import { fetchProducts, type ProductFilters } from "./Product";
import type { Product, PageResponse } from "./ProductType";
import { fetchCategories } from "../category/Category";
import type { Category } from "../category/CategoryType";
import { ProductCard } from "./ProductCard"; // usamos helper aqui também p/ chips
import { centsStringToBRL } from "./money";
import { FilterSidebar, type FilterValues as SideBarValues } from "../../components/Filter/FilterSidebar";
import { BrandMark } from "../../components/BrandMark";

const DEFAULT_PAGE_SIZE = 12;

const toNumberOrUndefined = (s: string): number | undefined => {
  const n = Number(s);
  return Number.isFinite(n) && s !== "" ? n : undefined;
};

export default function ProductList() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [data, setData] = useState<PageResponse<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);

  // carrega categorias do back
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetchCategories(0, 100);
        if (!cancel) setCategories(res.content.map((c: Category) => ({ id: c.id, name: c.name })));
      } catch (e) { }
    })();
    return () => { cancel = true; };
  }, []);


  const handleSidebarChange = useCallback((v: SideBarValues) => {
    const next: ProductFilters = {
      categoryId: v.categoryId ? Number(v.categoryId) : undefined,
      minPrice: toNumberOrUndefined(v.minPrice),
      maxPrice: toNumberOrUndefined(v.maxPrice),
      // name: ...  <- se for usar campo de busca global depois
    };
    setFilters((prev) => {
      const a = JSON.stringify(prev);
      const b = JSON.stringify(next);
      return a === b ? prev : next;
    });
  }, []);
  // handler estável + evita set igual
  const handleFilterChange = useCallback((v: SideBarValues) => {
    const next: ProductFilters = {
      categoryId: v.categoryId ? Number(v.categoryId) : undefined,
      minPrice: toNumberOrUndefined(v.minPrice),
      maxPrice: toNumberOrUndefined(v.maxPrice),
    };
    setFilters((prev) => {
      const a = JSON.stringify(prev);
      const b = JSON.stringify(next);
      return a === b ? prev : next;
    });
  }, []);

  // hash p/ detectar mudança real dos filtros
  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

  // resetar página quando filtros/tamanho mudarem
  useEffect(() => {
    setPage(0);
  }, [filtersKey, size]);

  // buscar produtos
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetchProducts(page, size, filters);
        if (!cancel) setData(res);
      } catch (e: any) {
        if (!cancel) setErr(e?.message ?? "Erro ao carregar produtos");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [page, size, filtersKey]);

  // helpers de exibição
  const totalText = (data?.totalElements as unknown as string) ?? "0";
  const totalPagesText = (data?.totalPages as unknown as string) ?? "1";

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [String(c.id), c.name])),
    [categories]
  );

  const chips: Array<{ label: string; onClear: () => void }> = [];
  if (filters.categoryId != null) {
    const label = categoryMap.get(String(filters.categoryId));
    if (label) chips.push({ label: `Categoria: ${label}`, onClear: () => setFilters((f) => ({ ...f, categoryId: undefined })) });
  }
  if (typeof filters.minPrice === "number") {
    chips.push({ label: `Mín.: ${centsStringToBRL(filters.minPrice * 100)}`, onClear: () => setFilters((f) => ({ ...f, minPrice: undefined })) });
  }
  if (typeof filters.maxPrice === "number") {
    chips.push({ label: `Máx.: ${centsStringToBRL(filters.maxPrice * 100)}`, onClear: () => setFilters((f) => ({ ...f, maxPrice: undefined })) });
  }
  const clearAll = () => setFilters({});

  // paginação numérica (limitada) – quando totalPages for “absurdo”, mantém só anterior/próxima
  const safeTotalPages = Number(totalPagesText);
  const showNumbers = Number.isFinite(safeTotalPages) && safeTotalPages <= 50; // limite prático
  const pages = useMemo(() => {
    if (!showNumbers) return [];
    const current = (data?.number ?? page) + 1;
    const total = safeTotalPages;
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [data?.number, page, showNumbers, safeTotalPages]);


  return (
    <div className="flex flex-col gap-8">
      <BrandMark
        onSearch={(q) => {
          setFilters((prev) => {
            const next = { ...prev, name: q };
            return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
          });
        }}
      />

      <div className="mx-auto max-w-7xl  p-6  rounded-lg bg-white shadow">
        <header className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify">
          <h1 className="text-xl font-semibold text-gray-900 px-80">Produtos</h1>
          <div className="flex items-center gap-2 px-100">
            <label className="text-sm text-gray-600">Itens por página:</label>
            <select
              className="rounded-md border px-2 py-1 text-sm"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            >
              {[12, 24, 36, 48].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar à esquerda (layout Figma) */}
          <div className="col-span-12 md:col-span-3">
            <FilterSidebar
              categories={categories}
              onChange={handleSidebarChange}
            // initial={{ categoryId: "", minPrice: "", maxPrice: "" }}
            />
          </div>

          {/* Conteúdo à direita (grid de cards) */}
          <div className="col-span-12 md:col-span-9">
            <section className="relative">
              {/* overlay com blur durante loading (comportamento Figma) */}
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                </div>
              )}

              {err ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Erro: {err}
                </div>
              ) : (
                <>
                  {data?.content?.length ? (
                    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "pointer-events-none opacity-60" : ""}`}>
                      {data.content.map((p) => (
                        <ProductCard
                          key={`${p.id}-${p.sku}`}
                          product={p}
                          categoryName={categoryMap.get(String(p.categoryId))}
                          onAddToCart={() => {
                            // TODO: integrar carrinho (conforme "Evolução E-commerce")
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-500">
                      Nenhum produto encontrado.
                    </div>
                  )}

                  {/* Paginação resumida (mantém Anterior/Próxima) */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total: <strong>{(data?.totalElements as any) ?? "0"}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                        disabled={data?.first}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      >
                        Anterior
                      </button>
                      <span className="text-sm text-gray-700">
                        Página <strong>{(data?.number ?? page) + 1}</strong>
                      </span>
                      <button
                        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                        disabled={data?.last}
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
