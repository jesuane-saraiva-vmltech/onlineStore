import { WishlistProductCardProps } from "../../types/ProductCard";
import BaseProductCard from "../ui/BaseProductCard";

import styles from "../../styles/css/components/wishlist/WishlistProductCard.module.css";
import Button from "../ui/Button";

const WishlistProductCard = ({
  product,
  onMoveToCart,
  onRemove,
}: WishlistProductCardProps) => {
  return (
    <BaseProductCard product={product}>
      <div className={styles.container}>
        <div className={styles.button}>
          <Button onClick={onMoveToCart}>Move to Cart</Button>
        </div>
        <div className={styles.button}>
          <Button onClick={onRemove}>Remove</Button>
        </div>
      </div>
    </BaseProductCard>
  );
};

export default WishlistProductCard;
