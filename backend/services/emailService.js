import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  const mailOptions = {
    from: `"ApexStore" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  };

  return await transporter.sendMail(mailOptions);
};