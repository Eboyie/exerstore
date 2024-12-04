import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ProductCard from './Products/ProductCard';
import FilterButton from '../components/FilterButton';

import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const Shop = () => {
  const linkRef = useRef(null);
  const { products } = useSelector((state) => state.shop);
  const totalPosts = useSelector((state) => state.shop.products.length);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="w-full">
      <div ref={linkRef} className="align-element">
        <div className="flex flex-row justify-center bg-[#151515]">
          <FilterButton />

          <div>
            <div className="py-3 mx-auto w-full ">
              <h2 className="text-center text-2xl mb-2 md:text-3xl md:tracking-wide font-semibold ">
                {products?.length} Products Available
              </h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
                {products?.length === 0 ? (
                  <Loader />
                ) : (
                  currentPosts?.map((p) => (
                    <div className="" key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-center bg-gray-600 p-2 text-white">
          <p>
            <button
              onClick={() =>
                linkRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Back to top
            </button>
          </p>
        </div>
        <Footer />
      </div>
    </section>
  );
};
export default Shop;
