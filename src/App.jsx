
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

import './App.css';

import { fetchImages } from './services/api';

Modal.setAppElement('#root');

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      setLoading(true);
      setError(null);
      try {
        const { results, total_pages } = await fetchImages(query, page);
        setImages(prev => [...prev, ...results]);
        setTotalPages(total_pages);
      } catch (err) {
        console.error(err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (!newQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalPages(0);
  };

  const loadMore = () => setPage(prev => prev + 1);

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
