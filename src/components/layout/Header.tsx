import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

import { useCart } from "../../context/CartContext";
import styles from "../../styles/css/layout/Header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ModalType } from "../../types/Modal";
import Modal from "../ui/Modal";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";

const Header = () => {
  const { totalQuantity: totalCartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const toggleModal = (type: ModalType) => {
    setModalType(type);
  };

  return (
    <>
      {/* Using Framer motion's layout prop to automatically animate the header's
    dimensions // when the nav menu is added or removed from the DOM, since
    CSS won't allow it */}
      <motion.header
        layout
        transition={{ layout: { duration: 0.2, ease: "anticipate" } }}
        className={styles.header}
        role="banner"
      >
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
              className={styles.titleLink}
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
          <button
            className={styles.wishlist}
            aria-label="Wishlist"
            onClick={() => toggleModal("wishlist")}
          >
            <span className={styles.icon} aria-hidden>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </button>
          <button
            className={styles.cart}
            aria-label="Shopping Cart"
            aria-describedby="cart-count"
            onClick={() => toggleModal("cart")}
          >
            <span className={styles.icon} aria-hidden>
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
            <span id="cart-count" className={styles.count} aria-hidden>
              {totalCartItems}
            </span>
          </button>
        </div>
      </motion.header>
      <Modal onClose={() => toggleModal(null)} open={modalType !== null}>
        {modalType === "cart" && <Cart />}
        {modalType === "wishlist" && <Wishlist />}
      </Modal>
    </>
  );
};

export default Header;
