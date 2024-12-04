import { apiSlice } from './apiSlice';
import { ORDER_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: 'POST',
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: 'GET',
      }),
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        method: 'GET',
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: 'GET',
      }),
    }),

    deliveredOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/delivered`,
        method: 'PUT',
      }),
    }),

    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
        method: 'GET',
      }),
    }),

    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
        method: 'GET',
      }),
    }),

    getTotalSalesByDate: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales-date`,
        method: 'GET',
      }),
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliveredOrderMutation,
  useGetOrdersQuery,

  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,

  useDeleteOrderMutation,
} = orderApiSlice;
