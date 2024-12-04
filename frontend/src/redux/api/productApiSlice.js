import { PRODUCT_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: ({ keyword }) => ({
        url: PRODUCT_URL,
        params: { keyword },
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),

    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: 'Product', id: productId },
      ],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/allproducts`,
        method: 'GET',
      }),
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'PUT',
        body: formData,
      }),
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),

    CreateReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: 'POST',
        body: { checked, radio },
      }),
    }),

    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCT_URL}/delete-review`,
        method: 'DELETE',
        body: { productId, reviewId },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ productId }) => ({
        url: `${PRODUCT_URL}/delete-comment`,
        method: 'DELETE',
        body: { productId },
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery,
  useDeleteReviewMutation,
  useDeleteCommentMutation,
} = productApiSlice;
