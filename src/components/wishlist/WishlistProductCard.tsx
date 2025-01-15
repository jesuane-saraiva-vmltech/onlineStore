import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import BaseProductCard from "../ui/BaseProductCard";

import { ButtonColors } from "../../types/Button";
import { WishlistProductCardProps } from "../../types/ProductCard";

import Button from "../ui/Button";

import styles from "../../styles/css/components/wishlist/WishlistProductCard.module.css";

const WishlistProductCard = ({
  product,
  onMoveToCart,
  onRemove,
}: WishlistProductCardProps) => {
  return (
    <BaseProductCard product={product}>
      <div className={styles.container}>
        <div className={styles.button}>
          <Button
            onClick={onMoveToCart}
            aria-label={`Remove ${product.title} from wishlist`}
          >
            Move to Cart{" "}
            <FontAwesomeIcon icon={faShoppingCart} aria-hidden={true} />
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            onClick={onRemove}
            color={ButtonColors.Dark}
            aria-label={`Remove ${product.title} from wishlist`}
          >
            Remove
          </Button>
        </div>
      </div>
    </BaseProductCard>
  );
};

export default WishlistProductCard;
