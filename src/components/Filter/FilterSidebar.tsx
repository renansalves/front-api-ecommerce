
import { useEffect, useMemo, useRef, useState } from "react";

export type FilterValues = {
  categoryId: string;
  minPrice: string;
  maxPrice: string;
};

type CategoryOption = { id: number | string; name: string };

type Props = {
  initial?: Partial<FilterValues>;
  categories: CategoryOption[];
  onChange: (values: FilterValues) => void;
  debounceMs?: number;
  className?: string;
};

export function FilterSidebar({
  initial,
  categories,
  onChange,
  debounceMs = 400,
  className = "",
}: Props) {
  const [values, setValues] = useState<FilterValues>({
    categoryId: initial?.categoryId ?? "",
    minPrice: initial?.minPrice ?? "",
    maxPrice: initial?.maxPrice ?? "",
  });


  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);


  const debounced = useMemo(() => {
    let t: number | undefined;
    return (v: FilterValues) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => onChangeRef.current(v), debounceMs);
    };
  }, [debounceMs]);

  useEffect(() => {
    debounced(values);
  }, [values, debounced]);

  const applyNow = () => onChangeRef.current(values);

  const clearAll = () =>
    setValues({
      categoryId: "",
      minPrice: "",
      maxPrice: "",
    });

  return (
    <aside
      className={`sticky top-4 rounded-xl border bg-white p-4 shadow-sm ring-1 ring-gray-200 ${className}`}
      aria-labelledby="prod-filter-heading"
    >
      <h2 id="prod-filter-heading" className="sr-only">
        Filtros
      </h2>

      <section aria-labelledby="filter-categories">
        <h3
          id="filter-categories"
          className="mb-3 text-sm font-semibold text-gray-900"
        >
          Categorias
        </h3>

        <div className="mb-4 space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="category"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              checked={values.categoryId === ""}
              onChange={() => setValues((s) => ({ ...s, categoryId: "" }))}
            />
            Todos os Produtos
          </label>

          {categories.map((c) => (
            <label
              key={c.id}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              title={String(c.name)}
            >
              <input
                type="radio"
                name="category"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={values.categoryId === String(c.id)}
                onChange={() =>
                  setValues((s) => ({ ...s, categoryId: String(c.id) }))
                }
              />
              <span className="line-clamp-1">{c.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section aria-labelledby="filter-price-range">
        <h3 id="filter-price-range" className="mb-2 text-sm font-semibold text-gray-900">
          Faixa de Preço
        </h3>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label htmlFor="minPrice" className="mb-1 text-xs text-gray-500">
              Mín.
            </label>
            <input
              id="minPrice"
              inputMode="numeric"
              type="number"
              min={0}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0"
              value={values.minPrice}
              onChange={(e) =>
                setValues((s) => ({ ...s, minPrice: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="mb-1 text-xs text-gray-500">
              Máx.
            </label>
            <input
              id="maxPrice"
              inputMode="numeric"
              type="number"
              min={0}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="2000"
              value={values.maxPrice}
              onChange={(e) =>
                setValues((s) => ({ ...s, maxPrice: e.target.value }))
              }
            />
          </div>
        </div>
      </section>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={applyNow}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Limpar
        </button>
      </div>
    </aside>
  );
}
