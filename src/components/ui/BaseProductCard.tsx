import { Link } from "react-router-dom";
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
    <article className={`${styles.card} ${styles[direction]}`}>
      <div
        className={`${styles.imageContainer} ${styles[`image${imageSize}`]}`}
      >
        <Link to={`/products/${product.id}`} aria-label="Poduct image">
          <img src={product.image} alt={product.title} />
        </Link>
      </div>
      <div className={styles.content}>
        <Link to={`/products/${product.id}`}>
          <h2 className={styles.title}>{product.title}</h2>
        </Link>
        <p
          className={styles.price}
          aria-label={`Price: ${formatPrice(product.price)}`}
          tabIndex={0}
        >
          {formatPrice(product.price)}
        </p>
        {children}
      </div>
    </article>
  );
};

export default BaseProductCard;
