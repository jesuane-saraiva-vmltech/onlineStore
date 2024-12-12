import { useNavigate } from "react-router-dom";
import styles from "../../styles/css/components/error/ErrorPage.module.css";
import Button from "../ui/Button";

const ErrorPage = ({ error }: { error?: Error }) => {
  const navigate = useNavigate();

  return (
    <main className={styles.errorPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.subtitle} id="error-title">
          Sorry, an unexpected error has occurred.
        </p>
        {error && (
          <p className={styles.errorMessage} aria-label="Error details">
            {error.message}
          </p>
        )}
        <nav className={styles.actions} aria-label="Error page navigation">
          <Button
            onClick={() => navigate(-1)}
            aria-label="Go back to previous page"
          >
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} aria-label="Return to homepage">
            Go Home
          </Button>
        </nav>
      </div>
    </main>
  );
};

export default ErrorPage;
