import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('image', image);
      productData.append('price', price);
      productData.append('description', description);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('brand', brand);
      productData.append('countInStock', stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error('product creation failed, please try again');
      } else {
        toast.success('product created successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('product creation failed, please try again');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="md:w-3/4 py-3">
      <div className="h-12 text-3xl font-semibold">Create Product</div>

      {imageUrl && (
        <div className="text-center">
          <img
            src={imageUrl}
            alt="product"
            className="block mx-auto max-h-[200px]"
          />
        </div>
      )}

      <div className="mb-3">
        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 ">
          {image ? image.name : 'Upload Image'}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            className={!image ? 'hidden' : 'text-white'}
          />
        </label>
      </div>

      <div className="py-3">
        <div className="flex flex-col flex-wrap">
          <div className="one">
            <label htmlFor="name">Name</label> <br />
            <input
              type="text"
              className="p-4 mb-3 w-[100%] border rounded-lg bg-[#101011] text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="two">
            <label htmlFor="name block ">Price</label> <br />
            <input
              type="number"
              className="p-4 mb-3 w-[100%] border rounded-lg bg-[#101011] text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col flex-wrap">
          <div className="one">
            <label htmlFor="name name">Quantity</label> <br />
            <input
              type="quantity"
              className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="two">
            <label htmlFor="name block">Brand</label> <br />
            <input
              type="text"
              className="p-4 mb-3 w-[100%] border rounded-lg bg-[#101011] text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="" className="my-5">
          Description
        </label>
        <textarea
          type="text"
          className="p-2 mb-3 w-full border rounded-lg bg-[#101011] text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex flex-col">
          <div>
            <label htmlFor="name block">Count In Stock</label> <br />
            <input
              type="text"
              className="p-4 mb-3 w-[100%] border rounded-lg bg-[#101011] text-white"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name block">Category</label> <br />
            <select
              className="p-4 mb-3 w-[100%] border rounded-lg bg-[#101011] text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white py-3 px-4 rounded-lg text-lg font-bold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50 w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
