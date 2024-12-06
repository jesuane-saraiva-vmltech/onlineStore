import { useCart } from "../../context/CartContext";
import { ProductCardProps } from "../../types/Product";

import styles from "../../styles/css/components/productCard/ProductCard.module.css";
import BaseProductCard from "./BaseProductCard";

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <BaseProductCard product={product}>
      <div className={styles.content}>
        <button className={styles.addToCart} onClick={() => addItem(product)}>
          Add to Cart
        </button>
        <button aria-label="Add to wishlist" className={styles.wishlistButton}>
          ❤️
        </button>
      </div>
    </BaseProductCard>
  );
};

export default ProductCard;
