
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) {
    return null; 
  }

  const { urls, user, likes, description } = image; 

  if (!urls) {
    return null; 
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>Х</button>
        <img className={styles.image} src={urls.regular} alt={description || 'Image'} />
        <div className={styles.imageInfo}>
          {user && <p>Photo by {user.name}</p>}
          {likes !== undefined && <p>Likes: {likes}</p>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
