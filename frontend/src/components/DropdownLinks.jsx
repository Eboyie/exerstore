import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const DropdownLinks = ({ visible, setVisible }) => {
  return (
    <div>
      {/* Sidebar Menu for small screens */}
      <div
        className={`absolute top-0 left-0 right-0 bottom-0  bg-white translate-all sm:hidden ${
          visible ? 'w-full h-screen z-50 ' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="flex items-start py-2 pl-6 ">
            <button
              onClick={() => setVisible(!visible)}
              className="cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 border hover:pl-7 transition-all duration-300 ease-in-out"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 border hover:pl-7 transition-all duration-300 ease-in-out"
            to="/shop"
          >
            SHOP
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 border hover:pl-7 transition-all duration-300 ease-in-out"
            to="/cart"
          >
            CART
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 border hover:pl-7 transition-all duration-300 ease-in-out"
            to="/favorite"
          >
            FAVORITE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

DropdownLinks.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default DropdownLinks;
