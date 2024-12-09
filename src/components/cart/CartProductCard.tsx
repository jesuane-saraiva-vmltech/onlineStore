import {
  CartProductCardProps,
  Direction,
  ImageSize,
} from "../../types/ProductCard";
import BaseProductCard from "../ui/BaseProductCard";

import styles from "../../styles/css/components/cart/CartProductCard.module.css";

const CartProductCard = ({
  cartItem,
  onUpdateQuantity,
  onRemove,
}: CartProductCardProps) => {
  return (
    <BaseProductCard
      product={cartItem}
      imageSize={ImageSize.Small}
      direction={Direction.Horizontal}
    >
      <div className={styles.container}>
        <div className={styles.quantity}>
          <button onClick={() => onUpdateQuantity(cartItem.quantity - 1)}>
            -
          </button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => onUpdateQuantity(cartItem.quantity + 1)}>
            +
          </button>
        </div>
        <button onClick={onRemove}>Remove</button>
      </div>
    </BaseProductCard>
  );
};

export default CartProductCard;
