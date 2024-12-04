import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';

import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || '');
  const [name, setName] = useState(productData?.name || '');
  const [price, setPrice] = useState(productData?.price || '');
  const [category, setCategory] = useState(productData?.category || '');
  const [quantity, setQuantity] = useState(productData?.quantity || '');
  const [brand, setBrand] = useState(productData?.brand || '');
  const [stock, setStock] = useState(productData?.countInStock);
  const [description, setDescription] = useState(
    productData?.description || ''
  );

  const navigate = useNavigate();

  /* Fetch categories by RTK */
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  /* Update product by RTK */
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setPrice(productData.price);
      setDescription(productData.description);
      setCategory(productData.categories?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Item updated');
      setImage(res.image);
    } catch (error) {
      toast.error('Product update failed, please try again');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('brand', brand);
      formData.append('countInStock', stock);

      /* Update product by RTK */
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success('Product updated successfully');
        navigate('/admin/allproductslist');
      }
    } catch (error) {
      console.log(error);
      toast.error('Product update failed, please try again');
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        'Are you sure you want to delete this product?'
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);

      toast.success(`${data.name} deleted successfully`);
      navigate('/admin/allproductslist');
    } catch (error) {
      toast.error('Product delete failed, please try again');
    }
  };

  return (
    <div className="w-full container">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update/Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block w-full mx-auto max-h-[200px]"
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
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ">
                <label htmlFor="name block ">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
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
              <div className="two ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
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

            <div className="flex flex-col justify-center">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Category</label> <br />
                <select
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
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
            <div>
              <button
                type="submit"
                className="bg-green-500 mr-6 text-white py-2 px-3 rounded-lg text-lg font-bold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-capacity-50"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-3 rounded-lg text-lg font-bold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
