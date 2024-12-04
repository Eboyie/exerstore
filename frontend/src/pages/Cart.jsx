import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (Product, qty) => {
    dispatch(addToCart({ ...Product, qty }));
    toast.success('Cart updated successfully');
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Product removed from cart');
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <section className="align-element">
      <div className="flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/shop">
              <button className="bg-pink-500 text-white py-4 px-10 rounded-lg text-lg font-bold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-row justify-between items-center mb-[1rem] py-2 w-[100%]"
                >
                  <div className="w-[15rem] h-[12rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold text-pink-500 hover:underline hover:text-pink-400"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2">{item.brand}</div>
                    <div className="mt-2 font-bold">$ {item.price}</div>
                  </div>

                  <div>
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 "
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[0.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 ">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Total:</h2>
                    <h2 className="text-xl font-semibold">
                      ${' '}
                      {cartItems
                        .reduce((acc, item) => acc + item.price * item.qty, 0)
                        .toFixed(2)}
                    </h2>
                  </div>

                  <button
                    onClick={checkoutHandler}
                    className="bg-pink-500 text-white p2-4 px-4 mt-4 w-full rounded-full text-lg font-bold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50"
                    disabled={cartItems.length === 0}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default Cart;
