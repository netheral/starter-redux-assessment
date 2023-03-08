import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion',
  async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  suggestion: '',
  loading: false,
  error: null,
};

const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload.data; // Update the state with `action.payload.data` instead of `action.payload.suggestion`
        state.error = null;
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.suggestion = '';
        state.error = action.error.message;
      });
  },
});

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
