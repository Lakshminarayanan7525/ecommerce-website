import Order from '../models/Order.js';
import { generateInvoicePDF } from '../utils/pdfGenerator.js';
import { sendEmail } from '../services/emailService.js';

export const addOrderItems = async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, deliveryCharges, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = new Order({
      orderId,
      user: req.user._id,
      items,
      shippingAddress,
      subtotal,
      deliveryCharges,
      totalAmount,
      paymentMethod,
    });

    const createdOrder = await order.save();

    const pdfBuffer = await generateInvoicePDF(createdOrder);

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Order Confirmation #${orderId}</h2>
        <p>Hi ${shippingAddress.name},</p>
        <p>Thank you for your purchase! Your order has been successfully placed.</p>
        <p>Your invoice is attached to this email.</p>
        <h3>Total Amount: ₹${totalAmount}</h3>
      </div>
    `;

    await sendEmail({
      to: shippingAddress.email,
      subject: `Order Invoice #${orderId} - ApexStore`,
      html,
      attachments: [
        {
          filename: `Invoice-${orderId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order Creation & Email Error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};