import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, quantity, brand, category, description } = req.fields;

    //Validation
    switch (true) {
      case !name:
        return res.status(500).json({ message: 'Name is required' });
      case !price:
        return res.status(500).json({ message: 'Price is required' });
      case !quantity:
        return res.status(500).json({ message: 'Quantity is required' });
      case !brand:
        return res.status(500).json({ message: 'Brand is required' });
      case !category:
        return res.status(500).json({ message: 'Category is required' });
      case !description:
        return res.status(500).json({ message: 'Description is required' });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, price, quantity, brand, category, description } = req.fields;

    //Validation
    switch (true) {
      case !name:
        return res.status(500).json({ message: 'Name is required' });
      case !price:
        return res.status(500).json({ message: 'Price is required' });
      case !quantity:
        return res.status(500).json({ message: 'Quantity is required' });
      case !brand:
        return res.status(500).json({ message: 'Brand is required' });
      case !category:
        return res.status(500).json({ message: 'Category is required' });
      case !description:
        return res.status(500).json({ message: 'Description is required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .sort({ createAt: -1 });

    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = {
        user: req.user._id,
        name: req.user.username,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(topProducts);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const newProducts = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(newProducts);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }

    if (radio.length) {
      args.price = {
        $gte: radio[0],
        $lte: radio[1],
      };
    }
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
