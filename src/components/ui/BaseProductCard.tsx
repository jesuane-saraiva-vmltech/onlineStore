import styles from "../../styles/css/components/ui/BaseProductCard.module.css";
import {
  BaseProductCardProps,
  Direction,
  ImageSize,
} from "../../types/ProductCard";
import { formatPrice } from "../../utils/formatter";

/*
I'm using this component to show prop drilling since it was required in the assignment.
In a real project, I'd probably create separate components for each type of card (product, cart, wishlist) instead of passing lots of props to customize one base component.
It would be cleaner and easier to maintain that way!
*/
const BaseProductCard = ({
  product,
  children,
  imageSize = ImageSize.Medium,
  direction = Direction.Vertical,
}: BaseProductCardProps) => {
  return (
    <div className={`${styles.card} ${styles[direction]}`}>
      <div
        className={`${styles.imageContainer} ${styles[`image${imageSize}`]}`}
      >
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        {children}
      </div>
    </div>
  );
};

export default BaseProductCard;
