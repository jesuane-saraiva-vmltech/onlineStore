import { useCart } from "../../context/CartContext";
import CartProductCard from "./CartProductCard";
import styles from "../../styles/css/components/cart/Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className={styles.cart}>
      <h3 className={styles.title}>
        My Cart{" "}
        <span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
      </h3>
      {items.length === 0 && <h4 className={styles.empty}>Cart is empty.</h4>}
      {items.map((item) => (
        <CartProductCard
          key={item.id}
          cartItem={item}
          onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
          onRemove={() => removeItem(item.id)}
        />
      ))}
    </div>
  );
};

export default Cart;
