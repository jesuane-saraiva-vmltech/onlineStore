import { WishlistProductCardProps } from "../../types/ProductCard";
import BaseProductCard from "./BaseProductCard";

import styles from "../../styles/css/components/productCard/WishlistProductCard.module.css";

const WishlistProductCard = ({
  product,
  onMoveToCart,
  onRemove,
}: WishlistProductCardProps) => {
  return (
    <BaseProductCard product={product}>
      <div className={styles.actions}>
        <button onClick={onMoveToCart}>Move to Cart</button>
        <button onClick={onRemove}>Remove</button>
      </div>
    </BaseProductCard>
  );
};

export default WishlistProductCard;
