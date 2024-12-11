import { useNavigate } from "react-router-dom";
import styles from "../../styles/css/components/error/ErrorPage.module.css";
import Button from "../ui/Button";

interface ErrorPageProps {
  error?: Error;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {error && <p className={styles.errorMessage}>{error.message}</p>}
        <div className={styles.actions}>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
