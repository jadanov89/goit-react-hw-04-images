import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from 'components/Modal/Modal.module.css';

const Modal = ({ onClick, children }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired,
};

export default Modal;
