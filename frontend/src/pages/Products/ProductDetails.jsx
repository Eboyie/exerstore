import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from 'react-icons/fa';
import moment from 'moment';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import HeartIcon from './HeartIcon';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../redux/api/productApiSlice';
import Ratings from './Ratings';
import ProductTabs from './ProductTabs';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));

    navigate('/cart');
  };

  return (
    <section className="w-full">
      <div className="align-element">
        <Link to="/shop" className="text-white font-semibold hover:underline ">
          <button className="bg-pink-500 text-white py-2 px-2 rounded-lg hover:bg-pink-600 tracking-widest ">
            Go Back
          </button>
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            <div className="pt-4 grid gap-6 grid-cols-1 md:grid-cols-2 mt-[2rem] w-full mx-auto">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[20rem] rounded object-cover p-2 bg-white"
                />

                <HeartIcon product={product} />
              </div>

              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4  text-[#BOBOBO]">{product.description}</p>
                <p className="text-3xl font-extrabold">${product.price}</p>

                <div className="flex flex-row items-center justify-between w-[20rem]">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="text-white mr-2" />
                      Brand: {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="text-white mr-2" />
                      Added: {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="text-white mr-2" />
                      Reviews: {product.numReviews}
                    </h1>
                  </div>

                  <div className="two">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="text-white mr-2" />
                      Ratings: {product.rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="text-white mr-2" />
                      Quantity: {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="text-white mr-2" />
                      In Stock: {product.countInStock}
                    </h1>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap ">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />

                  {product.countInStock > 0 && (
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                        className="w-[6rem] p-2 border rounded-lg bg-[#101011] text-white"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="btn-container">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap justify-between">
                <ProductTabs
                  loadingProductReview={loadingProductReview}
                  userInfo={userInfo}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  submitHandler={submitHandler}
                  product={product}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default ProductDetails;
