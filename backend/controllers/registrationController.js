import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const registration = new Registration({ user: req.user.id, event: eventId });
    await registration.save();

    await Event.findByIdAndUpdate(eventId, { $push: { registrations: registration._id } });

    res.json({ message: 'Registered for event' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate('user event');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};