import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} from '../../redux/api/categoryApiSlice';
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal';

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Category name is required');
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
        return;
      } else {
        setName('');
        toast.success(`${result.name} created successfully`);
      }
    } catch (error) {
      toast.error('Create category failed, please try again');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error('Category name is required');
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updateCategory: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} updated`);
        setSelectedCategory(null);
        setUpdatingName('');
        setModalVisible(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} deleted successfully`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      toast.error('Delete category failed, please try again');
    }
  };

  return (
    <div className="flex flex-col flex-wrap md:flex-row w-full">
      <div className="w-full py-3">
        <div className="text-2xl font-bold">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-between justify-start space-x-4 flex-wrap w-full">
          {categories?.map((category) => (
            <div key={category._id} className="">
              <button
                className=" border text-pink-500 hover:text-white py-2 px-4 my-3 m rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-capacity-50"
                onClick={() => {
                  setUpdatingName(category.name);
                  setSelectedCategory(category);
                  setModalVisible(true);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            handleDelete={handleDeleteCategory}
            buttonText="Update"
          />
        </Modal>
      </div>
    </div>
  );
};
export default CategoryList;
