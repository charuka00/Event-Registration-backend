import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  capacity: { type: Number },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }],
});

export default mongoose.model('Event', eventSchema);