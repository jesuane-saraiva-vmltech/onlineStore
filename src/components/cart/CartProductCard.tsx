import {
  CartProductCardProps,
  Direction,
  ImageSize,
} from "../../types/ProductCard";
import BaseProductCard from "../ui/BaseProductCard";

import styles from "../../styles/css/components/cart/CartProductCard.module.css";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
          <button
            className={styles.updateButton}
            onClick={() => onUpdateQuantity(cartItem.quantity - 1)}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
          <span className={styles.quantityText}>{cartItem.quantity}</span>
          <button
            className={styles.updateButton}
            onClick={() => onUpdateQuantity(cartItem.quantity + 1)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </div>
        <div>
          <Button onClick={onRemove}>Remove</Button>
        </div>
      </div>
    </BaseProductCard>
  );
};

export default CartProductCard;
