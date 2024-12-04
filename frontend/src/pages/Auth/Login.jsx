import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../redux/api/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <div>
      <section className="align-element">
        <div className="flex flex-col justify-center ">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form className="max-w-[40rem]" onSubmit={submitHandler}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 p-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? 'Signing  In...' : 'Sign In'}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className="text-pink-500  hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
