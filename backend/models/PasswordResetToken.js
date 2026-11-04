import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } // 600 seconds = 10 minutes
});

export default mongoose.model('PasswordResetToken', passwordResetTokenSchema);