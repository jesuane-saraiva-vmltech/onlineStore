import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { ModalProps } from "../../types/Modal";

import styles from "../../styles/css/components/ui/Modal.module.css";

export default function Modal({
  children,
  open,
  onClose,
  moduleStyles = "",
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  // handle location change
  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return createPortal(
    <dialog
      aria-modal="true"
      data-testid="modal"
      ref={dialog}
      className={`${moduleStyles} ${styles.modal}`}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()} // if user clicks on the blur
    >
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close modal"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {children}
    </dialog>,
    document.body
  );
}
