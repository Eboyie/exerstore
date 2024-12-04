import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

import { setCredentials } from '../../redux/features/auth/authSlice';
import { useProfileMutation } from '../../redux/api/userApiSlice';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className=" p-4 mt-[3rem] align-element">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className=" mb-4">
              <label className="block text-white mb-2">Name</label>

              <input
                type="text"
                className="form-input w-full p-4 rounded-sm  text-black bg-gray-500"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className=" mb-4">
              <label className="block text-white mb-2">Email</label>

              <input
                type="email"
                className="form-input w-full p-4 rounded-sm  text-black bg-gray-500"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" mb-4">
              <label className="block text-white mb-2">Password</label>

              <input
                type="password"
                className="form-input w-full p-4 rounded-sm  text-black bg-gray-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" mb-4">
              <label className="block text-white mb-2">Confirm Password</label>

              <input
                type="password"
                className="form-input w-full p-4 rounded-sm  text-black bg-gray-500"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};
export default Profile;
