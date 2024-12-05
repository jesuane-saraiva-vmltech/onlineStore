import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../../context/CartContext";
import styles from "../../styles/css/layout/Header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { totalQuantity: totalCartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={styles.header} role="banner">
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="navigation-menu"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faXmark : faBars}
          aria-hidden="true"
        />
      </button>

      <div className={styles.logo}>
        <h1 className={styles.title}>
          <NavLink
            to="/"
            aria-label="YouGift homepage"
            className={`${styles.titleLink} ${isMenuOpen ? styles.isOpen : ""}`}
          >
            YouGift
          </NavLink>
        </h1>
      </div>

      <nav
        id="navigation-menu"
        className={`${styles.navigation} ${isMenuOpen ? styles.isOpen : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className={styles.navigationList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={toggleMenu}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>

      <div
        className={styles.actions}
        role="navigation"
        aria-label="User actions"
      >
        <div className={styles.wishlist}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </div>
        <div className={styles.cart}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </span>
          <span className={styles.count}>{totalCartItems}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
