import { useGetAllProductsQuery } from '../../redux/api/productApiSlice';

const AllComment = () => {
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Comments</h1>

      {products?.map((product) => (
        <section key={product._id} className=" flex flex-col justify-center">
          {product?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] border p-4 rounded-lg mb-2"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-gray-300">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {review.createdAt.substr(0, 10)}
                </p>
              </div>

              <p className="mb-2">{review.comment}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
export default AllComment;
