import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import HeartIcon from './HeartIcon';

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full">
      <div className="relative mb-0">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[15rem] rounded-md object-cover hover:shadow-lg hover:shadow-pink-300 transition-shadow"
          />
        </Link>
        <HeartIcon product={product} />

        <div className="p-4">
          <h2 className="flex justify-between items-center mt-2">
            {product.name}
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2 py-1 rounded dark:bg-pink-900  dark:text-pink-300 hover:bg-pink-300 hover:text-pink-900">
              ${product.price}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

SmallProduct.propTypes = {
  product: PropTypes.object,
};

export default SmallProduct;
