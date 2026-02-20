import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/register/RegisterPage";
import ProductList from "../features/product/ProductList";

function RouteError() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold">Algo deu errado</h1>
      <p className="text-sm text-gray-600">Tente recarregar a página ou voltar para a página inicial.</p>
      <a href="/" className="mt-3 inline-flex rounded-md border px-3 py-1 text-sm">Ir para Home</a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteError />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/product/list", element: <ProductList /> },
    ],
  },
]);
