import Category from '../models/categoryModel.js';
import asyncHandler from 'express-async-handler';

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ message: 'Name is required' });
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).send('Category already exists');
    }

    const category = new Category({ name });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send('Server Error');
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.name = req.body.name || category.name;
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: 'Categories not found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
