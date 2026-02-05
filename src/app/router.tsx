
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/register/RegisterPage";
import ProductList from "../features/product/ProductList";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/product/list", element: <ProductList /> },
    ],
  },
]);

