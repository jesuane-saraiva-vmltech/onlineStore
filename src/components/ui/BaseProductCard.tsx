import { Link } from "react-router-dom";

import {
  BaseProductCardProps,
  Direction,
  ImageSize,
} from "../../types/ProductCard";

import { formatPrice } from "../../utils/formatter";

import styles from "../../styles/css/components/ui/BaseProductCard.module.css";
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
    <article
      className={`${styles.card} ${styles[direction]}`}
      data-testid="container"
    >
      <div
        className={`${styles.imageContainer} ${styles[`image${imageSize}`]}`}
        data-testid="image-container"
      >
        <Link to={`/products/${product.id}`} aria-label="Poduct image">
          <img src={product.image} alt={product.title} loading="lazy" />
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
