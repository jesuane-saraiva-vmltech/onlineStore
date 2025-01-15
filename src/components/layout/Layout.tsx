import { Outlet } from "react-router-dom";

import Header from "./Header";

import styles from "../../styles/css/layout/Layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
