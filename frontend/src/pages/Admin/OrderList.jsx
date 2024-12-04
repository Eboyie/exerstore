import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from '../../redux/api/orderApiSlice';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        toast.success('Order deleted');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error.data?.message || error.message}
        </Message>
      ) : (
        <table className="container mt-8 mx-auto">
          <thead className="w-full">
            <tr className="mb-[5rem]">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATE</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVERY</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td className="pl-1">{order._id}</td>

                <td className="pl-1">
                  {order.user ? order.user.username : 'N/A'}
                </td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                </td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="py-2 px-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <p className="text-center bg-blue-400 w-[6rem] rounded-full">
                      More
                    </p>
                  </Link>
                </td>

                <td>
                  <button
                    className="text-center bg-red-400 w-[6rem] rounded-full"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default OrderList;
