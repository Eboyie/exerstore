import PropTypes from 'prop-types';

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = 'Submit',
  handleDelete,
}) => {
  return (
    <div className="py-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded-lg py-3 px-4 bg-black text-white "
        />
        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

CategoryForm.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default CategoryForm;
