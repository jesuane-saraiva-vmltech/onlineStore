import { CartProductCardProps } from "../../types/ProductCard";
import BaseProductCard from "./BaseProductCard";

import styles from "../../styles/css/components/productCard/CartProductCard.module.css";

const CartProductCard = ({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartProductCardProps) => {
  return (
    <BaseProductCard product={product}>
      <div className={styles.actions}>
        <div className={styles.quantity}>
          <button onClick={() => onUpdateQuantity(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onUpdateQuantity(quantity + 1)}>+</button>
        </div>
        <button onClick={onRemove}>Remove</button>
      </div>
    </BaseProductCard>
  );
};

export default CartProductCard;
