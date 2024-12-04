import { useGetTopProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import SmallProduct from '../pages/Products/SmallProduct.jsx';
import ProductCarousel from '../pages/Products/ProductCarousel.jsx';

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {data.map((product) => {
            return (
              <div key={product._id}>{<SmallProduct product={product} />}</div>
            );
          })}
        </div>

        <ProductCarousel />
      </div>

      <hr className="border-1 border-pink-300" />
    </section>
  );
};

export default Header;
