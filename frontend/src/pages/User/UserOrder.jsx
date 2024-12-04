import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice';

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="align-element ">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="">
              <td className="py-2 ">IMAGE</td>
              <td className="py-2 hidden lg:table-cell">ID</td>
              <td className="py-2 hidden lg:table-cell">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2"></td>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="">
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] mb-5"
                />
                <td className="py-2 hidden lg:table-cell">{order._id}</td>
                <td className="py-2 hidden lg:table-cell">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="py-2">${order.totalPrice}</td>

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
                <td className="py-2 px-2">
                  <Link
                    to={`/order/${order._id}`}
                    className="bg-pink-500 text-back py-2 px-3 rounded"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default UserOrder;
