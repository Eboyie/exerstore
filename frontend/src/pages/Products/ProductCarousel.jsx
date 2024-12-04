import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import Message from '../../components/Message';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from 'react-icons/fa';

const ProductCarousel = () => {
  const { data: products, isLoading, isError } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 hidden lg:block">
      {isLoading ? null : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="block mx-auto max-h-auto w-[100%] rounded-lg"
        >
          {products?.map(
            ({
              _id,
              name,
              image,
              price,
              rating,
              countInStock,
              createdAt,
              description,
              quantity,
              brand,
              numReviews,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />

                <div className="flex flex-col w-[25rem] mt-2">
                  <div className="one">
                    <div className="flex justify-between mb-2">
                      <h2>{name}</h2>
                      <p>${price}</p>
                    </div>
                    <p className="w-[25rem]">{description.substring(0, 100)}</p>{' '}
                  </div>

                  <div className="flex justify-between w-[20rem] mt-2">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2 text-white" /> Added:{' '}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2 text-white" /> Reviews:{' '}
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white" /> Ratings: {rating}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{' '}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaBox className="mr-2 text-white" /> In Stock:{' '}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};
export default ProductCarousel;
