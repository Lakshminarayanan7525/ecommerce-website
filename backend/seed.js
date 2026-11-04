import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();

const categoriesData = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80' },
  { name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Watches', slug: 'watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Home Appliances', slug: 'home-appliances', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80' }
];

const seedData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    const createdCategories = await Category.insertMany(categoriesData);
    const getCatId = (name) => createdCategories.find(c => c.name === name)._id;

    const productsData = [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound with active noise cancellation and 40-hour battery life.',
        originalPrice: 19999,
        discountPrice: 12999,
        category: getCatId('Electronics'),
        categoryName: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        stock: 25,
        rating: 4.8
      },
      {
        name: 'Smart 4K Ultra HD TV 55"',
        description: 'Stunning 4K resolution with HDR and built-in streaming apps.',
        originalPrice: 55000,
        discountPrice: 42999,
        category: getCatId('Electronics'),
        categoryName: 'Electronics',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
        stock: 10,
        rating: 4.6
      },
      {
        name: 'Men Slim Fit Casual Shirt',
        description: '100% breathable cotton casual shirt for everyday wear.',
        originalPrice: 2499,
        discountPrice: 1299,
        category: getCatId('Fashion'),
        categoryName: 'Fashion',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
        stock: 50,
        rating: 4.3
      },
      {
        name: 'Women Floral Summer Dress',
        description: 'Lightweight and elegant floral dress perfect for outings.',
        originalPrice: 3499,
        discountPrice: 1999,
        category: getCatId('Fashion'),
        categoryName: 'Fashion',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
        stock: 40,
        rating: 4.7
      },
      {
        name: 'Pro Running Sneakers',
        description: 'High-performance running shoes with superior cushioning.',
        originalPrice: 4999,
        discountPrice: 2999,
        category: getCatId('Shoes'),
        categoryName: 'Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        stock: 35,
        rating: 4.9
      },
      {
        name: 'Classic Casual Leather Shoes',
        description: 'Premium leather shoes designed for formal and casual occasions.',
        originalPrice: 6000,
        discountPrice: 3999,
        category: getCatId('Shoes'),
        categoryName: 'Shoes',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
        stock: 20,
        rating: 4.4
      },
      {
        name: 'Luxury Chronograph Watch',
        description: 'Stainless steel analog watch with water resistance.',
        originalPrice: 12999,
        discountPrice: 7999,
        category: getCatId('Watches'),
        categoryName: 'Watches',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        stock: 15,
        rating: 4.8
      },
      {
        name: 'Minimalist Smart Fitness Watch',
        description: 'Track heart rate, sleep, and workouts with smartphone sync.',
        originalPrice: 4999,
        discountPrice: 2999,
        category: getCatId('Watches'),
        categoryName: 'Watches',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
        stock: 30,
        rating: 4.5
      },
      {
        name: 'Designer Leather Backpack',
        description: 'Spacious and durable laptop backpack with multiple compartments.',
        originalPrice: 4500,
        discountPrice: 2499,
        category: getCatId('Accessories'),
        categoryName: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        stock: 25,
        rating: 4.6
      },
      {
        name: 'Polarized Aviator Sunglasses',
        description: 'UV400 protection sunglasses with sleek metal frame.',
        originalPrice: 2999,
        discountPrice: 1499,
        category: getCatId('Accessories'),
        categoryName: 'Accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
        stock: 40,
        rating: 4.3
      },
      {
        name: 'Automatic Espresso Coffee Machine',
        description: 'Brew cafe-quality espresso and cappuccino at home.',
        originalPrice: 25000,
        discountPrice: 18999,
        category: getCatId('Home Appliances'),
        categoryName: 'Home Appliances',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
        stock: 8,
        rating: 4.9
      },
      {
        name: 'High-Power Air Fryer',
        description: 'Enjoy crispy fried food with 90% less oil.',
        originalPrice: 9999,
        discountPrice: 6499,
        category: getCatId('Home Appliances'),
        categoryName: 'Home Appliances',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
        stock: 18,
        rating: 4.7
      }
    ];

    await Product.insertMany(productsData);
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();