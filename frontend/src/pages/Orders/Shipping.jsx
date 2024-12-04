//
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  saveShippingAddress,
  savePaymentMethod,
} from '../../redux/features/cart/cartSlice';

import ProgressSteps from '../../components/ProgressSteps';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ' '
  );
  const [country, setCountry] = useState(shippingAddress.country || ' ');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  //payment method
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  return (
    <div className="align-element mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex flex-wrap justify-around items-center ">
        <form onSubmit={SubmitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>

          <div className="mb-4">
            <label className="block mb-2 text-white">
              Address
              <input
                type="text"
                className="p-2 w-full border rounded bg-[#101011] text-white"
                placeholder="Enter your address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">
              City
              <input
                type="text"
                className="p-2 w-full border rounded bg-[#101011] text-white"
                placeholder="Enter your city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">
              Postal Code
              <input
                type="text"
                className="p-2 w-full border rounded bg-[#101011] text-white"
                placeholder="Enter your postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">
              Country
              <input
                type="text"
                className="p-2 w-full border rounded bg-[#101011] text-white"
                placeholder="Enter your country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2 flex justify-around ">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-pink-500"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Stripe</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 w-full rounded-full text-lg font-bold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default Shipping;
