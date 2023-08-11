import style from 'components/Loader/Loader.module.css'
import PropTypes from "prop-types";

const Loader = ({ click, loading }) => {
  return (
    <button type="button" className={style.btnn} onClick={click} disabled={loading}>
      {loading ? <div className={style.spinner}></div> : 'Load More'}
    </button>
  );
};

Loader.propTypes = {
  click: PropTypes.func,
  loading: PropTypes.bool,
};

export default Loader;