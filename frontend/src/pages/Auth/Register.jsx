import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('Account created successfully');
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <section>
      <div className="align-element">
        <h1 className="text-2xl font-semibold mb-4 ">Register</h1>

        <form onSubmit={submitHandler} className="container max-w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded text-black bg-gray-500"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded text-black bg-gray-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded text-black bg-gray-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>

            <input
              type="Password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border rounded text-black bg-gray-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className=" bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 my-[1rem]"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account?
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="text-pink-400 px-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div></div>
    </section>
  );
};
export default Register;
