import PropTypes from 'prop-types';

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };
  return (
    <section className="flex flex-row items-center justify-center gap-3 mt-2">
      {/* pagination prev */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="border px-4 py-2 mx-1 rounded-full hover:bg-pink-400 transition-all duration-500 "
      >
        Previous
      </button>

      <div className="flex flex-wrap justify-center">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={`border px-4 py-2 mx-1 rounded-full ${
              page === currentPage
                ? 'bg-pink-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* pagination next */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className="border px-4 py-2 mx-1 rounded-full hover:bg-pink-400 transition-all duration-500"
      >
        Next
      </button>
    </section>
  );
};

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
