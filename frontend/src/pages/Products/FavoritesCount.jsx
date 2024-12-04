import { useSelector } from 'react-redux';

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute top-8 left-2">
      {favoriteCount > 0 && (
        <div className="text-white bg-red-500 w-6 h-6 flex items-center justify-center rounded-full">
          {favoriteCount}
        </div>
      )}
    </div>
  );
};
export default FavoritesCount;
