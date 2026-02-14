import { useEffect, useMemo, useRef, useState } from "react";

export type FilterValues = {
  name: string;
  categoryId: string;
  minPrice: string;
  maxPrice: string;
};

type Props = {
  initial?: Partial<FilterValues>;
  categories?: Array<{ id: number | string; name: string }>;
  onChange: (values: FilterValues) => void;
  debounceMs?: number;
};

export function Filter({ initial, categories = [], onChange, debounceMs = 400 }: Props) {
  const [values, setValues] = useState<FilterValues>({
    name: initial?.name ?? "",
    categoryId: initial?.categoryId ?? "",
    minPrice: initial?.minPrice ?? "",
    maxPrice: initial?.maxPrice ?? "",
  });

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

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
      name: "",
      categoryId: "",
      minPrice: "",
      maxPrice: "",
    });

  return (
    <aside className="sticky top-4 rounded-xl border bg-white p-4 shadow-sm ring-1 ring-gray-200">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Categorias</h2>
      <div className="mb-4 space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="radio"
            name="category"
            className="h-4 w-4"
            checked={values.categoryId === ""}
            onChange={() => setValues((s) => ({ ...s, categoryId: "" }))}
          />
          Todos os Produtos
        </label>
        {categories.map((c) => (
          <label key={c.id} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="category"
              className="h-4 w-4"
              checked={values.categoryId === String(c.id)}
              onChange={() => setValues((s) => ({ ...s, categoryId: String(c.id) }))}
            />
            {c.name}
          </label>
        ))}
      </div>

      <h2 className="mb-2 text-sm font-semibold text-gray-900">Faixa de Preço</h2>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          type="number"
          min={0}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Mín."
          value={values.minPrice}
          onChange={(e) => setValues((s) => ({ ...s, minPrice: e.target.value }))}
        />
        <input
          type="number"
          min={0}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Máx."
          value={values.maxPrice}
          onChange={(e) => setValues((s) => ({ ...s, maxPrice: e.target.value }))}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={applyNow}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Limpar
        </button>
      </div>
    </aside>
  );
}
