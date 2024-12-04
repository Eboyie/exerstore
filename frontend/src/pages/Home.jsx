import { Link, useParams } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import { useRef } from 'react';
import { useGetAllProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header';
import Product from './Products/Product';
import Footer from '../components/Footer';

const Home = () => {
  const linkRef = useRef(null);
  const { keyword } = useParams();
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  return (
    <div ref={linkRef} className="w-full">
      <div className="align-element">
        <div>{!keyword ? <Header /> : null}</div>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError.message}
          </Message>
        ) : (
          <section className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="mt-[3rem] text-2xl md:text-4xl font-bold px-3">
                Special <br /> <span className="text-pink-600">Products</span>
              </h1>

              <Link to="/shop">
                <button className="bg-pink-600 font-bold text-2xl rounded-lg mt-[3rem] py-2 px-3 ">
                  Shop
                </button>
              </Link>
            </div>

            <div className="pt-12 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 txl:grid-cols-4 ">
              {products?.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div>
        <div className="flex justify-center bg-gray-600 p-2 text-white">
          <p className="flex text-center items-center hover:text-pink-300 ">
            <button
              onClick={() =>
                linkRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Back to top
            </button>
            <FaArrowUp size={14} />
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
