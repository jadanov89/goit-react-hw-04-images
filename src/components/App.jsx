import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Api, searchPixabayAPI } from '../Api/Api';
import Modal from './Modal/Modal';

const App = () => {
  const [bigImagePath, setBigImagePath] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);

  useEffect(() => {
    if (isSearchCompleted) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, isSearchCompleted]);

  const onSearch = useCallback(newSearch => {
    setSearch(newSearch);
    setPage(1);
    setHits([]);
    setIsSearchCompleted(true);
  }, []);

  const fetchImages = async () => {
    setLoadingMore(true);
    setError(null);

    try {
      let data;
      if (search) {
        data = await searchPixabayAPI(search, page);
      } else {
        data = await Api(page);
      }
      setTimeout(() => {
        setHits(prevHits => (page === 1 ? data.hits : [...prevHits, ...data.hits]));
        setLoadingMore(false);
      }, 300);
    } catch (error) {
      setError(error);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    setLoadingMore(true);
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = path => {
    setBigImagePath(path);
  };

  return (
    <div>
      <Searchbar onSearch={onSearch} />
      {bigImagePath && (
        <Modal onClick={toggleModal} path={bigImagePath}>
          <img src={bigImagePath} alt="" />
        </Modal>
      )}

      {error && <p>!!!</p>}

      {isSearchCompleted && (
        <ImageGallery image={hits} toggleModal={toggleModal} />
      )}

      {!loadingMore && hits.length > 0 && <Loader click={loadMore} />}
      {loadingMore && <Loader loading={true} />}
    </div>
  );
};
//jjjj
export default App;



