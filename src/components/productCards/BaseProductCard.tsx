import styles from "../../styles/css/components/productCard/BaseProductCard.module.css";
import { BaseProductCardProps } from "../../types/ProductCard";

const BaseProductCard = ({
  product,
  children,
  moduleStyles = "",
}: BaseProductCardProps) => {
  return (
    <div className={`${styles.card} ${moduleStyles}`}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>€{product.price}</p>
        {children}
      </div>
    </div>
  );
};

export default BaseProductCard;
