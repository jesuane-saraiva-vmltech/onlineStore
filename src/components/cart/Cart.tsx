import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../../context/CartContext";

import CartProductCard from "./CartProductCard";

import styles from "../../styles/css/components/cart/Cart.module.css";

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <section className={styles.cart} aria-labelledby="cart-heading">
      <h2 id="cart-heading" className={styles.title} tabIndex={0}>
        My Cart <FontAwesomeIcon aria-hidden="true" icon={faShoppingCart} />
      </h2>
      {items.length === 0 && (
        <p role="status" className={styles.cartStatus}>
          Your shopping cart is empty.
        </p>
      )}
      <ul className={styles.cartList}>
        {items.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <CartProductCard
              cartItem={item}
              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
              onRemove={() => removeItem(item.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Cart;
