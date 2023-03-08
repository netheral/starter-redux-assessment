import { useSelector, useDispatch } from 'react-redux';
import { removePhoto, selectFilteredPhotos } from '../photos.slice.js';
import './list.css';


export default function PhotosList() {
  const photos = useSelector(selectFilteredPhotos);
  const dispatch = useDispatch();

  function handleDeleteButtonClick(id) {
    dispatch(removePhoto({ id }));
  }

  const photosListItems = photos.map(({ id, caption, imageUrl }) => (
    <li key={id}>
      <img alt={caption} src={imageUrl} />
      <div>
        <p>{caption}</p>
        <button data-testid={`${caption}-button`} onClick={() => handleDeleteButtonClick(id)}>
          Delete
        </button>
      </div>
    </li>
  ));

  return photosListItems.length > 0 ? (
    <ul>{photosListItems}</ul>
  ) : (
    <h3>No doggies to display...</h3>
  );
}