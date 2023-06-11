import React from "react";
import './InfoTooltip.css';
import success from "../../images/Union-success.png";
import fail from "../../images/Union-fail.png";
import { successMessages } from "../../utils/constants";

function InfoToolTip({ isOpen, onClose, status, errorMessage }) {
  const isOk = status === 'ok';

  function handleEsc(e) {
    if (e.key === 'Escape') {
      onClose && onClose()
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen])

  return (
    <div className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`} >
      <div className="info-tooltip__container">
        <button type="button" className="button info-tooltip__button-close" aria-label="Close" onClick={onClose}></button>
        <img className={`info-tooltip__union-img ${isOk && 'info-tooltip__union-img_success'}`}
          src={isOk ? success : fail} alt="" />
        <p className="info-tooltip__text">
          {isOk
            ? `${successMessages.register}`
            : `${errorMessage}`
          }
        </p>
      </div>
    </div>
  )
}

export default InfoToolTip;
