import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../redux/api/userApiSlice';

import Message from '../../components/Message';

const UserLists = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableUserEmail, setEditableUserEmail] = useState('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.message);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      toast.success('User updated successfully');
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <div className="py-4 w-full">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <div>
          <table className="w-full mx-auto">
            <thead>
              <tr>
                <th className="py-2 text-left">ID</th>
                <th className="py-2 text-left">NAME</th>
                <th className="py-2 text-left">EMAIL</th>
                <th className="py-2 text-left">ADMIN</th>
                <th className="py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className=" py-2">{user._id}</td>

                  <td className=" py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center ">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="p-2 border rounded-lg w-full text-black"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center ">
                        {user.username}{' '}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className=" py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center ">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="p-2 border rounded-lg w-full text-black"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white px-4 py-2 ml-2  rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.email, user.username)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500 cursor-pointer" />
                    )}
                  </td>

                  <td className="py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UserLists;
