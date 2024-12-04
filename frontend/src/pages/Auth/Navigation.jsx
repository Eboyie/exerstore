import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import './Navigation.css';
import {
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineShopping,
} from 'react-icons/ai';

import { useLogoutMutation } from '../../redux/api/userApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import FavoritesCount from '../../pages/Products/FavoritesCount';
import AdminMenu from '../Admin/AdminMenu';
import DropdownLinks from '../../components/DropdownLinks';

function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 z-50 fixed top-0 items-center py-3 w-full ">
      <div className="flex justify-between items-center align-element">
        <div className="flex gap-2 items-center">
          {/* dropdown button */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden hover:rotate-90 transition-all duration-300 ease-in-out"
          >
            <FaBars size={16} />
          </button>
          {visible && (
            <DropdownLinks visible={visible} setVisible={setVisible} />
          )}

          <Link
            to="/"
            className="flex items-center transition-transform transform hover:scale-110"
          >
            <span className="nav-item-name block text-sky-300 font-bold text-xl ">
              2BE
            </span>
          </Link>
        </div>
        <div className="flex justify-between gap-2 md:gap-5 items-center">
          <NavLink
            to="/"
            className="flex items-center transition-transform transform hover:scale-110"
          >
            <AiOutlineShopping className="mr-2 w-6 h-6 hidden" />
            <p className="hidden nav-item-name sm:block ">Home</p>
          </NavLink>
          <NavLink
            to="/shop"
            className="flex items-center transition-transform transform hover:scale-110"
          >
            <AiOutlineShopping className="mr-2 w-6 h-6 sm:hidden" />
            <p className="hidden nav-item-name sm:block ">Shop</p>
          </NavLink>
          <NavLink
            to="/cart"
            className="flex items-center transition-transform transform hover:scale-110"
          >
            <AiOutlineShoppingCart className="mr-2 w-6 h-6 sm:hidden" />
            <span className="hidden nav-item-name sm:block ">Cart</span>

            <div className="absolute top-8 left-2">
              {cartItems.length > 0 && (
                <span className="bg-red-500  w-6 h-6 flex justify-center text-sm text-white rounded-full items-center">
                  {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/favorite"
            className="flex items-center transition-transform transform hover:scale-110"
          >
            <FaRegHeart className="mr-2 w-5 h-5 sm:hidden" />
            <span className="nav-item-name hidden sm:block ">Favorite</span>
            <FavoritesCount />
          </NavLink>
        </div>

        <div className="relative flex flex-between space-x-4">
          <button
            onClick={toggleDropdown}
            className="flex  items-center text-white"
          >
            {userInfo ? (
              <span className=" hover:capitalize hover:text-white">
                {userInfo.username}
              </span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                className={`w-4 h-4 ml-1 hover:text-white transition duration-300 ease-in-out ${
                  dropdownOpen ? 'transform-rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
              </svg>
            )}

            {dropdownOpen && userInfo && (
              <ul
                className={`absolute right-0 space-y-2 bg-black text-white ${
                  !userInfo.isAdmin ? 'top-10' : 'top-10'
                }`}
              >
                {userInfo.isAdmin && (
                  <>
                    <AdminMenu />
                  </>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-2 py-1 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={logoutHandler}
                    className="block w-full px-2 py-1 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </button>

          {!userInfo && (
            <ul className="flex justify-between space-x-2 items-center">
              <li>
                <Link
                  to="/login"
                  className="flex items-center transition-transform transform hover:translate-x-1"
                >
                  <AiOutlineLogin className="mr-2 w-6 h-6" />
                  <span className="nav-item-name hidden mt-[3rem]">Login</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center transition-transform transform hover:translate-x-1"
                >
                  <AiOutlineUserAdd className="  w-6 h-6" />
                  <span className="nav-item-name hidden mt-[3rem]">
                    Register
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navigation;
