import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Ratings = ({ value, text, color = 'yellow-500' }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1`} />
      ))}

      {halfStars > 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}

      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-1`} />
      ))}

      <span className={`ml-[2rem] rating-text text-${color}`}>
        {text && text}
      </span>
    </div>
  );
};

Ratings.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Ratings;
