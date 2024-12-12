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
        <div
          className={styles.quantity}
          role="group"
          aria-label={`Quantity controls for ${cartItem.title}`}
        >
          <button
            className={styles.updateButton}
            onClick={() => onUpdateQuantity(cartItem.quantity - 1)}
            aria-label={`Decrease quantity of ${cartItem.title}`}
            disabled={cartItem.quantity <= 1}
          >
            <FontAwesomeIcon icon={faMinusCircle} aria-hidden="true" />
          </button>
          <span
            className={styles.quantityText}
            aria-live="polite"
            role="status"
          >
            {cartItem.quantity}
          </span>
          <button
            className={styles.updateButton}
            onClick={() => onUpdateQuantity(cartItem.quantity + 1)}
            aria-label={`Increase quantity of ${cartItem.title}`}
          >
            <FontAwesomeIcon icon={faPlusCircle} aria-hidden="true" />
          </button>
        </div>
        <div>
          <Button
            onClick={onRemove}
            aria-label={`Remove ${cartItem.title} from cart`}
          >
            Remove
          </Button>
        </div>
      </div>
    </BaseProductCard>
  );
};

export default CartProductCard;
