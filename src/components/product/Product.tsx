import { useCart } from "../../context/CartContext";
import { ProductCardProps } from "../../types/Product";

import styles from "../../styles/css/components/product/ProductCard.module.css";
import BaseProductCard from "../ui/BaseProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../context/WishlistContext";
import Button from "../ui/Button";

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <BaseProductCard product={product}>
      <div className={styles.content}>
        <Button onClick={() => addItem(product)}>Add to Cart</Button>
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
