import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';
import {
  setCategories,
  setProducts,
  setChecked,
} from '../redux/features/shop/shopSlice';

const FilterButton = () => {
  const dispatch = useDispatch();
  const [priceFilter, setPriceFilter] = useState('');

  const { categories, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        //Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // check if the product price includes the entered price filter value

            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    priceFilter,
    filteredProductsQuery.data,
    filteredProductsQuery.isLoading,
    dispatch,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((item) => item !== id);
    dispatch(setChecked(updatedChecked));
  };

  //Add all brands option on uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand.trim())
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // update the price filter state when the user types in the input filled
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="hidden md:block bg-[#151515]  mb-2 w-[15rem]">
        <div className="px-5">
          <h2 className="font-bold text-center py-2 bg-[#0c02022c] rounded mb-2">
            Filter By Categories
          </h2>

          <div className="py-5 w-[15rem]">
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

          <h2 className="text-center font-bold py-2 bg-[#0c02022c] rounded mb-2">
            Filter By Brands
          </h2>

          <div className="py-5">
            {uniqueBrands?.map((brand) => (
              <Fragment key={brand}>
                <div className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    name="brand"
                    id={brand}
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600 bg-gray-500 rounded border-gray-500 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              </Fragment>
            ))}
          </div>

          <h2 className="font-bold text-center py-2 bg-[#0c02022c] rounded mb-2">
            Filter By Price
          </h2>

          <div className="p-5">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full border rounded-lg py-4 px-2 bg-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-pink-500 text-white text-center"
            />
          </div>

          <div className="p-5 pt-0">
            <button
              className="w-full border my-4 px-10 rounded-lg text-lg font-bold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterButton;
