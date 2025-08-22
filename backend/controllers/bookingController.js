// backend/controllers/bookingController.js
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

// Book ticket
export const bookTicket = async (req, res) => {
  try {
    const { fullName, idCardNumber, tickets, price } = req.body;
    const { eventId } = req.params;
    const userId = req.auth.id;

    if (!fullName || !idCardNumber || !tickets || !price) {
      return res.status(400).json({ message: "Please provide all booking details" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const booking = await Booking.create({
      event: eventId,
      user: userId,
      fullName,
      idCardNumber,
      tickets,
      price,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
