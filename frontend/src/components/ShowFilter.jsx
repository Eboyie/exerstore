import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';
import { setCategories, setChecked } from '../redux/features/shop/shopSlice';

const ShowFilter = () => {
  const dispatch = useDispatch();
  const { categories, checked } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((item) => item !== id);
    dispatch(setChecked(updatedChecked));
  };
  return (
    <div className="fixed top-[56px] left-0 w-full h-[40vh] md:hidden z-1000 bg-lime-800">
      <h2 className=" text-center py-2 bg-black  mb-2">Filter By Categories</h2>

      <div className="p-5 w-[15rem]">
        {categories?.map((c) => (
          <div key={c._id} className="mb-2">
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                id="red-checked"
                value={c._id}
                onChange={(e) => handleCheck(e.target.checked, c._id)}
                className="w-4 h-4 text-pink-600 bg-gray-300 rounded border-gray-500 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />

              <label
                htmlFor="pink-checked"
                className="ml-2 text-sm font-medium text-white dark:text-gray-300"
              >
                {c.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowFilter;
