import { useState } from 'react';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import SmallProduct from './SmallProduct';
import Loader from '../../components/Loader';

import PropTypes from 'prop-types';

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  rating,
  setRating,
  comment,
  setComment,
  product,
  submitHandler,
}) => {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col w-full">
      <section>
        <div
          className={`flex-1 py-4 cursor-pointer text-lg ${
            activeTab === 1 ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write your Reviews
        </div>
        <div
          className={`flex-1 py-4 cursor-pointer text-lg ${
            activeTab === 2 ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(2)}
        >
          See Reviews
        </div>
        <div
          className={`flex-1 py-4 cursor-pointer text-lg ${
            activeTab === 3 ? 'font-bold' : ''
          }`}
          onClick={() => handleTabClick(3)}
        >
          <button className="bg-pink-500 text-white py-2 px-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50">
            Check Top Products
          </button>
        </div>
      </section>

      <section>
        {activeTab === 1 && (
          <div className="py-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-lg mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-lg mb-2">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    required
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg text-lg font-bold hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-capacity-50"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{' '}
                <Link to="/login">
                  <span className="text-pink-400 hover:text-pink-600 ">
                    login
                  </span>
                </Link>{' '}
                to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No reviews</p>}</div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings
                    value={review.rating}
                    text={`${review.rating} out of 5`}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <section className="flex flex-col justify-between mx-auto">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

ProductTabs.propTypes = {
  loadingProductReview: PropTypes.bool,
  userInfo: PropTypes.object,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  comment: PropTypes.string,
  setComment: PropTypes.func,
  product: PropTypes.object,
  submitHandler: PropTypes.func,
};

export default ProductTabs;
