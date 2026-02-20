import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthFromCookie } from "../hooks/useAuthFromCoockies";

import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

type BrandMarkProps = {
  onSearch?: (term: string) => void;
  cartCount?: number;
  tokenCookieName?: string;
};

export function BrandMark({
  onSearch,
  cartCount,
  tokenCookieName = "jwt-token",
}: BrandMarkProps) {
  const { isAuthenticated } = useAuthFromCookie(tokenCookieName);
  const location = useLocation();
  const navigate = useNavigate();

  const isProductList =
    location.pathname === "/product/list" ||
    location.pathname.startsWith("/product/list/");

  const showActions = isAuthenticated && isProductList;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    if (!q) return;

    if (onSearch) {
      onSearch(q);
    } else {
      navigate(`/product/list?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow">
      <Link to="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
        <svg aria-hidden="true" viewBox="0 0 32 36" className="h-7 w-7 fill-blue-600">
          <path d="M27.2813 16.8125V26.75C27.2813 27.4375 27.0365 28.026 26.547 28.5156C26.0574 29.0052 25.4688 29.25 24.7813 29.25H7.28133C6.59383 29.25 6.00529 29.0052 5.5157 28.5156C5.02612 28.026 4.78133 27.4375 4.78133 26.75V16.8125C4.30216 16.375 3.93237 15.8125 3.67195 15.125C3.41154 14.4375 3.40633 13.6875 3.65633 12.875L4.96883 8.625C5.1355 8.08333 5.43237 7.63542 5.85945 7.28125C6.28654 6.92708 6.78133 6.75 7.34383 6.75H24.7188C25.2813 6.75 25.7709 6.92188 26.1876 7.26562C26.6042 7.60938 26.9063 8.0625 27.0938 8.625L28.4063 12.875C28.6563 13.6875 28.6511 14.4271 28.3907 15.0938C28.1303 15.7604 27.7605 16.3333 27.2813 16.8125ZM18.7813 15.5C19.3438 15.5 19.7709 15.3073 20.0626 14.9219C20.3542 14.5365 20.4688 14.1042 20.4063 13.625L19.7188 9.25H17.2813V13.875C17.2813 14.3125 17.4272 14.6927 17.7188 15.0156C18.0105 15.3385 18.3647 15.5 18.7813 15.5ZM13.1563 15.5C13.6355 15.5 14.0261 15.3385 14.3282 15.0156C14.6303 14.6927 14.7813 13.875 14.7813 13.875V9.25H12.3438L11.6563 13.625C11.573 14.125 11.6824 14.5625 11.9845 14.9375C12.2865 15.3125 12.6772 15.5 13.1563 15.5ZM7.59383 15.5C7.96883 15.5 8.29695 15.3646 8.5782 15.0938C8.85945 14.8229 9.03133 14.4792 9.09383 14.0625L9.78133 9.25H7.34383L6.09383 13.4375C5.96883 13.8542 6.03654 14.3021 6.29695 14.7812C6.55737 15.2604 6.98966 15.5 7.59383 15.5ZM24.4688 15.5C25.073 15.5 25.5105 15.2604 25.7813 14.7812C26.0522 14.3021 26.1147 13.8542 25.9688 13.4375L24.6563 9.25H22.2813L22.9688 14.0625C23.0313 14.4792 23.2032 14.8229 23.4845 15.0938C23.7657 15.3646 24.0938 15.5 24.4688 15.5ZM7.28133 26.75H24.7813V17.9375C24.6772 17.9792 24.6095 18 24.5782 18C24.547 18 24.5105 18 24.4688 18C23.9063 18 23.4115 17.9062 22.9845 17.7188C22.5574 17.5312 22.1355 17.2292 21.7188 16.8125C21.3438 17.1875 20.9167 17.4792 20.4376 17.6875C19.9584 17.8958 19.448 18 18.9063 18C18.3438 18 17.8178 17.8958 17.3282 17.6875C16.8386 17.4792 16.4063 17.1875 16.0313 16.8125C15.6772 17.1875 15.2657 17.4792 14.797 17.6875C14.3282 17.8958 13.823 18 13.2813 18C12.6772 18 12.1303 17.8958 11.6407 17.6875C11.1511 17.4792 10.7188 17.1875 10.3438 16.8125C9.90633 17.25 9.47404 17.5573 9.04695 17.7344C8.61987 17.9115 8.1355 18 7.59383 18C7.55216 18 7.50529 18 7.4532 18C7.40112 18 7.34383 17.9792 7.28133 17.9375V26.75ZM24.7813 26.75H7.28133C7.34383 26.75 7.40112 26.75 7.4532 26.75C7.50529 26.75 7.55216 26.75 7.59383 26.75C8.1355 26.75 8.61987 26.75 9.04695 26.75C9.47404 26.75 9.90633 26.75 10.3438 26.75C10.5313 26.75 10.7345 26.75 10.9532 26.75C11.172 26.75 11.4063 26.75 11.6563 26.75C11.9063 26.75 12.1667 26.75 12.4376 26.75C12.7084 26.75 12.9897 26.75 13.2813 26.75C13.5522 26.75 13.8126 26.75 14.0626 26.75C14.3126 26.75 14.5574 26.75 14.797 26.75C15.0365 26.75 15.2605 26.75 15.4688 26.75C15.6772 26.75 15.8647 26.75 16.0313 26.75C16.4063 26.75 16.8386 26.75 17.3282 26.75C17.8178 26.75 18.3438 26.75 18.9063 26.75C19.1772 26.75 19.4376 26.75 19.6876 26.75C19.9376 26.75 20.1824 26.75 20.422 26.75C20.6615 26.75 20.8907 26.75 21.1095 26.75C21.3282 26.75 21.5313 26.75 21.7188 26.75C22.1355 26.75 22.5574 26.75 22.9845 26.75C23.4115 26.75 23.9063 26.75 24.4688 26.75C24.5105 26.75 24.547 26.75 24.5782 26.75C24.6095 26.75 24.6772 26.75 24.7813 26.75Z" />
        </svg>
        <span className="text-lg font-semibold">E‑commerce</span>
      </Link>

      {showActions && (
        <div className="mx-auto flex">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSubmit} className="relative w-56 sm:w-72">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                name="q"
                type="search"
                placeholder="Pesquisar produtos..."
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                autoComplete="off"
              />
            </form>
          </div>
          <div className="mx-auto flex flex-row">
            <Link
              to="/conta"
              className="group flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
              aria-label="Minha conta"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
              <span className="hidden text-sm text-gray-700 sm:inline">Minha conta</span>
            </Link>

            <Link
              to="/carrinho"
              className="relative rounded-md p-2 hover:bg-gray-50"
              aria-label="Carrinho"
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              {typeof cartCount === "number" && cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
