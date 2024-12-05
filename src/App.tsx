import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/layout/Layout";
import { CartProvider } from "./context/CartContext";
import LandingPage from "./pages/LandingPage";
import ProductListPage from "./pages/ProductListPage";
import "./styles/css/global.css";
import { WishlistProvider } from "./context/WishlistContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/products",
        element: <ProductListPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
