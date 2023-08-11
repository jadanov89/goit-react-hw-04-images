import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const LoadMoreButton = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={css.Button} type="button">
      Load more
    </button>
  );
};

LoadMoreButton.propTypes = { loadMore: PropTypes.func.isRequired };

export default LoadMoreButton;
