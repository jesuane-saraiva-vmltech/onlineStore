import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/css/pages/ProductPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fakeStoreAPI";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { Product } from "../types/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ButtonColors } from "../types/Button";
import ErrorPage from "../components/error/ErrorPage";
import { formatPrice } from "../utils/formatter";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/products");
    }
  }, [id, navigate]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return fetchProduct(id);
    },
    enabled: !!id,
    retry: 2,
  });

  if (isLoading) return <LoadingOverlay />;
  if (error) return <ErrorPage error={error} />;
  if (!product) return null;

  return (
    <main className={styles.productPage} aria-label="Product details">
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={styles.details}>
          <h2 tabIndex={0} aria-label={`Product: ${product.title}`}>
            {product.title}
          </h2>
          <p
            className={styles.price}
            aria-label={`Price: ${formatPrice(product.price)}`}
            tabIndex={0}
          >
            {formatPrice(product.price)}
          </p>
          <p
            className={styles.description}
            aria-label={`Description: ${product.price}`}
            tabIndex={0}
          >
            {product.description}
          </p>

          <div className={styles.actions}>
            <Button
              onClick={() => handleAddToCart(product)}
              isSuccess={isSuccess}
              disabled={isSuccess}
              aria-label={
                isSuccess ? "Product added to cart" : "Add product to cart"
              }
            >
              {isSuccess ? (
                "Added!"
              ) : (
                <>
                  Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
                </>
              )}
            </Button>
            <Button
              color={ButtonColors.Dark}
              onClick={() => navigate("/products")}
              aria-label="Return to products list"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductPage;
