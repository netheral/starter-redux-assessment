import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../photos.slice.js';


import './create.css';

export default function CreatePhoto() {
  const [formData, setFormData] = useState({ imageUrl: '', caption: '' });
  const dispatch = useDispatch();

  function handleChange({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addPhoto(formData));
    setFormData({ imageUrl: '', caption: '' });
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>Add a photo</h2>
      <div>
        <label htmlFor="url">Enter your image's url</label>
        <input
          id="url"
          name="imageUrl"
          onChange={handleChange}
          placeholder="e.g., https://example.com/photo.jpg"
          type="text"
          value={formData.imageUrl}
        />
      </div>
      <div>
        <label htmlFor="caption">Enter your image's caption:</label>
        <input
          id="caption"
          name="caption"
          onChange={handleChange}
          placeholder="e.g., My awesome photo"
          type="text"
          value={formData.caption}
        />
      </div>
      <input type="submit" />
    </form>
  );
}
