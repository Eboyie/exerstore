import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      //check if item is already in favorites
      if (!state.find((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },

    //Remove item with match ID
    removeFromFavorites: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProducts = (state) => state.favorites;
export default favoriteSlice.reducer;
