import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../context/WishlistContext";
import styles from "../../styles/css/components/wishlist/Wishlist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WishlistProductCard from "./WishlistProductCard";
import { useCart } from "../../context/CartContext";
import { Product } from "../../types/Product";

const Wishlist = () => {
  const { items, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (product: Product) => {
    toggleWishlist(product);
    addItem(product);
  };

  return (
    <div className={styles.wishlist}>
      <h3 className={styles.title}>
        My Wishlist{" "}
        <span>
          <FontAwesomeIcon icon={faHeart} />
        </span>
      </h3>
      {items.length === 0 && (
        <h4 className={styles.empty}>Wishlist is empty.</h4>
      )}
      {items.map((item) => (
        <WishlistProductCard
          key={item.id}
          product={item}
          onMoveToCart={() => moveToCart(item)}
          onRemove={() => toggleWishlist(item)}
        />
      ))}
    </div>
  );
};

export default Wishlist;
