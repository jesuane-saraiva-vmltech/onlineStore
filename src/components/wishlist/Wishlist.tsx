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
    <section className={styles.wishlist} aria-labelledby="wishlist-heading">
      <h3 className={styles.title} id="wishlist-heading" tabIndex={0}>
        My Wishlist{" "}
        <span>
          <FontAwesomeIcon icon={faHeart} aria-hidden={true} />
        </span>
      </h3>
      {items.length === 0 && (
        <p className={styles.empty} role="status">
          Wishlist is empty.
        </p>
      )}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.wishlistItems}>
            <WishlistProductCard
              product={item}
              onMoveToCart={() => moveToCart(item)}
              onRemove={() => toggleWishlist(item)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Wishlist;
