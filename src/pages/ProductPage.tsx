import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/css/pages/ProductPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fakeStoreAPI";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "../types/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ButtonColors } from "../types/Button";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
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
  });

  if (isLoading) return <LoadingOverlay />;
  // TEMPORARY:
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return null;

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={styles.details}>
          <h1>{product.title}</h1>
          <p className={styles.price}>{product.price}€</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <Button
              onClick={() => handleAddToCart(product)}
              isSuccess={isSuccess}
              disabled={isSuccess}
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
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
