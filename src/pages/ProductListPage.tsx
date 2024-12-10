import { useQuery } from "@tanstack/react-query";

import ProductCard from "../components/product/Product";
import styles from "../styles/css/pages/ProductListPage.module.css";
import { fetchProducts } from "../api/fakeStoreAPI";
import { useState } from "react";
import { Order } from "../types/ProductListingPage";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";

const ProductListPage = () => {
  const [sortBy, setSortBy] = useState(Order.PriceAsc);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", sortBy],
    queryFn: fetchProducts,
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
  });

  if (isLoading) return <LoadingOverlay />;
  // TEMPORARY:
  if (error) return <div>Error: {error.message}</div>;
  if (!products) return null;

  return (
    <div className={styles.plp}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Products</h1>
        <div className={styles.controls}>
          <select
            className={styles.sort}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as Order)}
          >
            <option value={Order.PriceAsc}>Price: Low to High</option>
            <option value={Order.PriceDesc}>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
