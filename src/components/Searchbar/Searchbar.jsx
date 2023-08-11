import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from 'components/Searchbar/Searchbar.module.css';

const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      alert('Поле пошуку пусте');
      return;
    }
    onSearch(search.trim());
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button className={style.SearchForm_batton} type="submit">
          <span>Search</span>
        </button>

        <input
          name="search"
          className={style.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;

