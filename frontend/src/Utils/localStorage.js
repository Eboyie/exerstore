//Add a product to local storage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.find((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

// Remove a product from local storage
export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem('favorites', JSON.stringify(updateFavorites));
};
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem('favorites');
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
