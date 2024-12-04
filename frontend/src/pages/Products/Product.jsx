import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeartIcon from './HeartIcon';

const Product = ({ product }) => {
  return (
    <div className="pt-3 w-[100%] relative">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[20rem] rounded object-cover hover:shadow-lg hover:shadow-pink-300 transition-shadow"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <h2 className="flex justify-between items-center">
          <div className="text-sm">{product.name}</div>
          <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2 py-0.5 rounded-full dark:bg-pink-900  dark:text-pink-300 hover:bg-pink-300 hover:text-pink-900">
            ${product.price}
          </span>
        </h2>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
