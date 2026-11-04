import express from 'express';
import { getCart, addToCart, updateCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart).put(protect, updateCart);

export default router;