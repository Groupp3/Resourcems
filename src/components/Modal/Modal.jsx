// Modal.jsx
import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";
import styles from "./Modal.module.css";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = "default", 
  confirmAction,
  confirmText = "Confirm",
  cancelText = "Cancel"
}) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAnimationClass(styles.show);
    } else {
      setAnimationClass("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    onClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${animationClass}`}>
      <div className={`${styles.modalContainer} ${styles[type]} ${animationClass}`}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {type === "success" && (
          <div className={styles.iconContainer}>
            <CheckCircle size={48} className={styles.successIcon} />
          </div>
        )}
        
        {type === "confirm" && (
          <div className={styles.iconContainer}>
            <AlertTriangle size={48} className={styles.confirmIcon} />
          </div>
        )}
        
        <div className={styles.modalContent}>
          {children}
        </div>
        
        <div className={styles.modalFooter}>
          {type === "confirm" && (
            <>
              <button className={styles.cancelButton} onClick={onClose}>
                {cancelText}
              </button>
              <button className={styles.confirmButton} onClick={handleConfirm}>
                {confirmText}
              </button>
            </>
          )}
          
          {type === "success" && (
            <button className={styles.okButton} onClick={onClose}>
              OK
            </button>
          )}
          
          {type === "default" && (
            <button className={styles.okButton} onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;