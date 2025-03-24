// Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({
  // Basic props
  isOpen,
  onClose,
  title = "Modal Title",
  body = "Modal body text goes here.",
  
  // Button props
  primaryButtonText = "Save changes",
  secondaryButtonText = "Close",
  onPrimaryClick,
  showPrimaryButton = true,
  showSecondaryButton = true,
  primaryButtonDisabled = false,
  secondaryButtonDisabled = false,
  primaryButtonClassName = "btn-primary",
  secondaryButtonClassName = "btn-secondary",
  
  // Sizing and positioning props
  size = "", // "", "sm", "lg", or "xl" 
  width = "", // Custom width (e.g., "600px" or "80%")
  maxHeight = "", // Custom max height
  centered = false,
  scrollable = false,
  fullscreen = false, // Takes up entire screen
  
  // Behavior props
  animation = true,
  backdrop = true, // true, false, or 'static' (doesn't close on click)
  keyboard = true,
  closeOnEsc = true,
  
  // Style props
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  modalContentClassName = "",
  backdropClassName = "",
  
  // Custom elements
  headerContent = null, // Custom header content
  footerContent = null, // Custom footer content
  showCloseButton = true,
  closeButtonPosition = "header", // "header", "footer", or "both"
  
  // Additional props
  id = "",
  zIndex = 1050,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  onShow = null, // Callback when modal is shown
  onShown = null, // Callback after modal is fully shown
  onHide = null, // Callback when modal begins hiding
  onHidden = null, // Callback after modal is fully hidden
  
  // Children
  children,
}) => {
  
  if (!isOpen) return null;
  
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (backdrop === true && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalClasses = [
    'modal',
    animation ? 'fade' : '',
    isOpen ? 'show' : '',
    className,
  ].filter(Boolean).join(' ');

  const modalDialogClasses = [
    'modal-dialog',
    size ? `modal-${size}` : '',
    centered ? 'modal-dialog-centered' : '',
    scrollable ? 'modal-dialog-scrollable' : '',
    fullscreen ? 'modal-fullscreen' : '',
  ].filter(Boolean).join(' ');

  const backdropClasses = [
    'modal-backdrop',
    animation ? 'fade' : '',
    isOpen ? 'show' : '',
    backdropClassName,
  ].filter(Boolean).join(' ');

  const contentStyle = {
    ...(width ? { width, maxWidth: '100%' } : {}),
    ...(maxHeight ? { maxHeight } : {}),
  };

  // Handle keyboard events if keyboard option is enabled
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && keyboard && e.key === 'Escape' && isOpen) {
        onClose();
        if (onHide) onHide(e);
      }
    };

    let activeElement = null;
    if (restoreFocus) {
      activeElement = document.activeElement;
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
      
      // Call onShow callback
      if (onShow) onShow();
      
      // Call onShown callback after animation completes
      if (animation && onShown) {
        const timer = setTimeout(() => {
          onShown();
        }, 300); // Typical CSS transition duration
        return () => clearTimeout(timer);
      } else if (onShown) {
        onShown();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      
      // Call onHidden callback after animation completes
      if (isOpen && onHidden) {
        if (animation) {
          const timer = setTimeout(() => {
            onHidden();
          }, 300);
          return () => clearTimeout(timer);
        } else {
          onHidden();
        }
      }
      
      // Restore focus
      if (restoreFocus && activeElement) {
        activeElement.focus();
      }
    };
  }, [isOpen, keyboard, closeOnEsc, onClose, animation, onShow, onShown, onHidden, restoreFocus]);

  // Auto focus the first focusable element
  React.useEffect(() => {
    if (isOpen && autoFocus) {
      const timer = setTimeout(() => {
        const modalElement = document.getElementById(id || 'modal');
        if (modalElement) {
          const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoFocus, id]);

  // Enforce focus within the modal
  React.useEffect(() => {
    if (!isOpen || !enforceFocus) return;
    
    const handleFocus = (e) => {
      const modalElement = document.getElementById(id || 'modal');
      if (modalElement && !modalElement.contains(e.target)) {
        const focusableElements = modalElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };
    
    document.addEventListener('focus', handleFocus, true);
    return () => document.removeEventListener('focus', handleFocus, true);
  }, [isOpen, enforceFocus, id]);

  // Render close button
  const renderCloseButton = () => (
    <button 
      type="button" 
      className="btn-close" 
      aria-label="Close"
      onClick={onClose}
    ></button>
  );

  // Render modal body
  const renderBody = () => {
    if (children) {
      return <div className={`modal-body ${bodyClassName}`}>{children}</div>;
    }
    return <div className={`modal-body ${bodyClassName}`}>{body}</div>;
  };

  return (
    <>
      <div 
        className={modalClasses} 
        style={{ display: isOpen ? 'block' : 'none', zIndex }}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        id={id || 'modal'}
        onClick={handleBackdropClick}
      >
        <div className={modalDialogClasses} role="document">
          <div className={`modal-content ${modalContentClassName}`} style={contentStyle}>
            {/* Modal Header */}
            {(title || headerContent || (showCloseButton && closeButtonPosition === 'header' || closeButtonPosition === 'both')) && (
              <div className={`modal-header ${headerClassName}`}>
                {headerContent ? (
                  headerContent
                ) : (
                  <>
                    <h5 className="modal-title">{title}</h5>
                    {showCloseButton && (closeButtonPosition === 'header' || closeButtonPosition === 'both') && renderCloseButton()}
                  </>
                )}
              </div>
            )}
            
            {/* Modal Body */}
            {renderBody()}
            
            {/* Modal Footer */}
            {(showPrimaryButton || showSecondaryButton || footerContent || (showCloseButton && closeButtonPosition === 'footer')) && (
              <div className={`modal-footer ${footerClassName}`}>
                {footerContent ? (
                  footerContent
                ) : (
                  <>
                    {showSecondaryButton && (
                      <button 
                        type="button" 
                        className={`btn ${secondaryButtonClassName}`}
                        onClick={onClose}
                        disabled={secondaryButtonDisabled}
                      >
                        {secondaryButtonText}
                      </button>
                    )}
                    {showPrimaryButton && (
                      <button 
                        type="button" 
                        className={`btn ${primaryButtonClassName}`}
                        onClick={handlePrimaryClick}
                        disabled={primaryButtonDisabled}
                      >
                        {primaryButtonText}
                      </button>
                    )}
                    {showCloseButton && closeButtonPosition === 'footer' && renderCloseButton()}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && backdrop && <div className={backdropClasses} style={{ zIndex: zIndex - 10 }}></div>}
    </>
  );
};

export default Modal;