import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalProps } from "../../types/Modal";
import styles from "../../styles/css/components/ui/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({
  children,
  open,
  onClose,
  moduleStyles = "",
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
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
