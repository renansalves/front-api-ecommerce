import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import { router } from "./router";
import { CartProvider } from "../features/cart/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />

    </CartProvider>
  </React.StrictMode >
);

