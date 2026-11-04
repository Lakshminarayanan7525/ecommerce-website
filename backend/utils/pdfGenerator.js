import PDFDocument from 'pdfkit';

export const generateInvoicePDF = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      doc.fontSize(20).fillColor('#1E293B').text('APEX STORE', { align: 'right' });
      doc.fontSize(10).fillColor('#64748B').text('123 Commerce St, Tech City', { align: 'right' });
      
      doc.moveDown();
      doc.fontSize(22).fillColor('#0F172A').text('TAX INVOICE', { align: 'left' });
      doc.moveDown(0.5);

      doc.fontSize(10).fillColor('#334155');
      doc.text(`Invoice Number: INV-${order.orderId}`);
      doc.text(`Order ID: ${order.orderId}`);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
      doc.text(`Payment Method: ${order.paymentMethod}`);
      
      doc.moveDown();
      doc.text(`Billed To:`, { underline: true });
      doc.text(`Name: ${order.shippingAddress.name}`);
      doc.text(`Email: ${order.shippingAddress.email}`);
      doc.text(`Address: ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`);

      doc.moveDown();

      const tableTop = doc.y;
      doc.rect(50, tableTop, 495, 20).fill('#F1F5F9');
      doc.fillColor('#0F172A').fontSize(10);
      doc.text('Item', 55, tableTop + 5);
      doc.text('Qty', 350, tableTop + 5, { width: 50, align: 'right' });
      doc.text('Price', 400, tableTop + 5, { width: 60, align: 'right' });
      doc.text('Total', 470, tableTop + 5, { width: 70, align: 'right' });

      let position = tableTop + 25;
      order.items.forEach(item => {
        doc.text(item.name, 55, position, { width: 280 });
        doc.text(item.quantity.toString(), 350, position, { width: 50, align: 'right' });
        doc.text(`₹${item.price.toFixed(2)}`, 400, position, { width: 60, align: 'right' });
        doc.text(`₹${(item.price * item.quantity).toFixed(2)}`, 470, position, { width: 70, align: 'right' });
        position += 20;
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};