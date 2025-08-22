import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  idCardNumber: { type: String, required: true },
  tickets: { type: Number, required: true },
  price: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
