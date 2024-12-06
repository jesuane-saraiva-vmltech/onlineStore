import { useQuery } from "@tanstack/react-query";

import ProductCard from "../components/productCards/ProductCard";
import styles from "../styles/css/pages/ProductListPage.module.css";
import { fetchProducts } from "../api/fakeStoreAPI";

const ProductListPage = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // TEMPORARY:
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products) return null;

  return (
    <div className={styles.plp}>
      <div className={styles.header}>
        <h1>All Products</h1>
        <div className={styles.controls}>
          <select className={styles.sort}>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
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
