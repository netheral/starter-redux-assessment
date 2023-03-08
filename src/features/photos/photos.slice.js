import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift(action.payload);
    },
    removePhoto: (state, action) => {
      const { id } = action.payload;
      const index = state.photos.findIndex((photo) => photo.id === id);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    }
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;
export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const searchTerm = selectSearchTerm(state);
  if (!searchTerm) {
    return selectAllPhotos(state);
  }
  return state.photos.photos.filter((photo) =>
    photo.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
