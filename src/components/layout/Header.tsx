import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../../context/CartContext";

import Cart from "../cart/Cart";
import Modal from "../ui/Modal";
import Wishlist from "../wishlist/Wishlist";

import { ModalType } from "../../types/Modal";

import styles from "../../styles/css/layout/Header.module.css";

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
      {/* I'm using Framer motion's layout prop to automatically animate the header's
    dimensions when the nav menu is added or removed from the DOM, since
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
          <h2 className={styles.title}>
            <NavLink
              to="/"
              aria-label="YouGift homepage"
              className={styles.titleLink}
            >
              YouGift
            </NavLink>
          </h2>
        </div>
        <nav
          id="navigation-menu"
          className={`${styles.navigation} ${isMenuOpen ? styles.isOpen : ""}`}
          role="navigation"
          aria-label="Main"
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
            <span
              id="cart-count"
              className={styles.count}
              aria-live="polite"
              aria-atomic={true}
              aria-label={`${totalCartItems} items in cart`}
            >
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
