const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

exports.createBooking = async (req, res) => {
  const { vehicleId, startTime, endTime } = req.body;
  if (!vehicleId || !startTime || !endTime) return res.status(400).json({ message: 'Missing' });
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.availability) return res.status(400).json({ message: 'Vehicle unavailable' });

    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60));
    const totalPrice = hours * vehicle.pricePerHour;

    // create booking
    const booking = new Booking({ user: req.user._id, vehicle: vehicle._id, startTime: start, endTime: end, totalPrice });
    await booking.save();

    // optionally mark vehicle unavailable
    vehicle.availability = false;
    await vehicle.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (String(booking.user) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    booking.status = 'cancelled';
    await booking.save();
    // free vehicle
    const vehicle = await Vehicle.findById(booking.vehicle);
    if (vehicle) { vehicle.availability = true; await vehicle.save(); }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};