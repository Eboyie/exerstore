import { Link } from 'react-router-dom';
import moment from 'moment';

import { useGetAllProductsQuery } from '../../redux/api/productApiSlice';
import Loader from '../../components/Loader';

const AllProducts = () => {
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="py-3 w-full mx-auto">
      <div className="text-xl font-bold h-12">
        All Products ({products.length})
      </div>{' '}
      <hr className="mb-3" />
      <div>
        {products.map((product) => (
          <Link
            to={`/admin/product/update/${product._id}`}
            key={product._id}
            className="block mb-4"
          >
            <div className="pt-8 flex justify-between gap-20 mx-auto w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[10rem] object-cover"
              />

              <div className="px-4 flex flex-col w-full">
                <div className="flex justify-between">
                  <h5 className="text-xl font-semibold mb-2">
                    {product?.name.substring(0, 30)}
                  </h5>
                  <p className="text-gray-400 text-sm">
                    {moment(product.createdAt).format('MMM Do YYYY')}
                  </p>
                </div>

                <p className="text-sm mb-4 text-gray-400 sm:w-[10rem] md:w-[20rem] xl:w-[30rem]">
                  {product?.description.substring(0, 160)} ...
                </p>

                <div className="flex justify-between w-full">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center py-1 px-1 sm:px-3 sm:py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-blue-800"
                  >
                    Update Product
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>

                  <p>${product?.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default AllProducts;
