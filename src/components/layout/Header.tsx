import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import styles from "../../styles/css/layout/Header.module.css";

const Header = () => {
  const { items: cartItems } = useCart();
  //const { items: wishlistItems } = useWishlist();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>YouGift</h1>
      </div>

      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        <div className={styles.wishlist}>
          <span className={styles.icon}>❤️</span>
          <span className={styles.count}>0</span>
        </div>
        <div className={styles.cart}>
          <span className={styles.icon}>🛒</span>
          <span className={styles.count}>{cartItems.length}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
