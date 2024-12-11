import { useCart } from "../../context/CartContext";
import { Product, ProductCardProps } from "../../types/Product";

import styles from "../../styles/css/components/product/ProductCard.module.css";
import BaseProductCard from "../ui/BaseProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../context/WishlistContext";
import Button from "../ui/Button";
import { useState } from "react";

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  return (
    <BaseProductCard product={product}>
      <div className={styles.content}>
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
        <button
          aria-label="Add to wishlist"
          className={styles.wishlistButton}
          onClick={() => toggleWishlist(product)}
        >
          <FontAwesomeIcon
            icon={isInWishlist(product.id) ? faHeartSolid : faHeart}
          />
        </button>
      </div>
    </BaseProductCard>
  );
};

export default ProductCard;
