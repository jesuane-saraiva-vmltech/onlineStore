import { useCart } from "../../context/CartContext";
import { ProductCardProps } from "../../types/Product";

import styles from "../../styles/css/components/product/ProductCard.module.css";

// TODO i don't think this is reusable enough :)
const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
        <button className={styles.wishlistButton} aria-label="Add to wishlist">
          ❤️
        </button>
      </div>
      <div className={styles.content}>
        <h2>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.addToCart} onClick={() => addItem(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
