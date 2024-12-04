import { useSelector } from 'react-redux';
import { selectFavoriteProducts } from '../../redux/features/favorites/favoriteSlice';
import Product from './Product';

const Favorites = () => {
  const favoriteProducts = useSelector(selectFavoriteProducts);

  return (
    <div className="w-full">
      <div className="align-element">
        <h1 className="text-lg font-bold mt-[3rem]">
          {/* FAVORITE PRODUCTS */}
          {favoriteProducts?.length > 1
            ? 'FAVORITE PRODUCTS'
            : 'No favorite products selected'}
        </h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-center mx-auto">
          {favoriteProducts?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
