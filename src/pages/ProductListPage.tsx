import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../api/fakeStoreAPI";
import ErrorPage from "../components/error/ErrorPage";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";
import ProductCard from "../components/product/ProductCard";

import { Order } from "../types/ProductListingPage";

import styles from "../styles/css/pages/ProductListPage.module.css";

const ProductListPage = () => {
  // Controls product sort order (price ascending/descending)
  const [sortBy, setSortBy] = useState(Order.PriceAsc);

  // Fetch and manage products data with React Query
  const {
    data: products,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products", sortBy],
    queryFn: fetchProducts,
    // Sort fetched products based on selected order
    select: (data) => {
      return [...data].sort((a, b) => {
        switch (sortBy) {
          case Order.PriceAsc:
            return a.price - b.price;
          case Order.PriceDesc:
            return b.price - a.price;
          default:
            return 0;
        }
      });
    },
    retry: 2, // Retry failed requests twice
  });

  // Handle loading, error, and empty states
  if (isLoading) return <LoadingOverlay />;
  if (error) return <ErrorPage error={error} />;
  if (!products || products.length === 0) {
    return <ErrorPage error={new Error("Unable to load products.")} />;
  }

  return (
    <div className={styles.plp}>
      <div className={styles.header}>
        <h1 className={styles.title} tabIndex={0}>
          All Products
        </h1>
        <div className={styles.controls}>
          <select
            className={styles.sort}
            value={sortBy}
            aria-label="Sort products by"
            onChange={(e) => setSortBy(e.target.value as Order)}
          >
            <option value={Order.PriceAsc}>Price: Low to High</option>
            <option value={Order.PriceDesc}>Price: High to Low</option>
          </select>
        </div>
      </div>
      {isFetching && <LoadingOverlay />}

      <main>
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id} className={styles.listItem}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ProductListPage;
