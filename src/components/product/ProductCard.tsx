import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import { Product, ProductCardProps } from "../../types/Product";

import BaseProductCard from "../ui/BaseProductCard";
import Button from "../ui/Button";

import { TIMEOUTS } from "../../utils/constants";

import styles from "../../styles/css/components/product/ProductCard.module.css";

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle adding product to cart with success feedback
  const handleAddToCart = (product: Product) => {
    addItem(product);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), TIMEOUTS.SUCCESS_FEEDBACK);
  };

  return (
    <BaseProductCard product={product}>
      <div className={styles.content}>
        <Button
          onClick={() => handleAddToCart(product)}
          isSuccess={isSuccess}
          disabled={isSuccess}
          aria-label={isSuccess ? "Added to cart" : "Add to cart"}
        >
          {isSuccess ? (
            "Added!"
          ) : (
            <>
              Add to Cart{" "}
              <FontAwesomeIcon icon={faShoppingCart} aria-hidden={true} />
            </>
          )}
        </Button>
        <button
          aria-label={
            isInWishlist(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={styles.wishlistButton}
          onClick={() => toggleWishlist(product)}
          title={
            isInWishlist(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <FontAwesomeIcon
            icon={isInWishlist(product.id) ? faHeartSolid : faHeart}
            aria-hidden={true}
          />
        </button>
      </div>
    </BaseProductCard>
  );
};

export default ProductCard;
