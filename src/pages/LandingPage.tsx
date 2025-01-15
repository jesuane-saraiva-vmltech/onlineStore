import { Link } from "react-router-dom";

import styles from "../styles/css/pages/LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Your Perfect Gift</h1>
          <p className={styles.subtitle}>What makes gifting special? YOU do!</p>
          <Link to="/products" className={styles.cta}>
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
