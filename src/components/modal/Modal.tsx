import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalProps } from "../../types/Modal";
import styles from "../../styles/css/components/modal/Modal.module.css";

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
    >
      {children}
    </dialog>,
    document.body
  );
}
