const Vehicle = require('../models/Vehicle');


// GET /api/vehicles?search=&type=&min=&max=&sort=price:-1&page=1&limit=10
exports.getVehicles = async (req, res) => {
const { page = 1, limit = 10, search = '', type, min, max, sort } = req.query;
const query = {};
if (search) query.model = { $regex: search, $options: 'i' };
if (type) query.type = type;
if (min) query.pricePerHour = { ...(query.pricePerHour || {}), $gte: Number(min) };
if (max) query.pricePerHour = { ...(query.pricePerHour || {}), $lte: Number(max) };


const sortObj = {};
if (sort) {
// e.g. sort=pricePerHour:asc or model:desc
const [field, dir] = sort.split(':');
sortObj[field] = dir === 'desc' ? -1 : 1;
} else {
sortObj.createdAt = -1;
}


try {
const total = await Vehicle.countDocuments(query);
const vehicles = await Vehicle.find(query)
.sort(sortObj)
.skip((page - 1) * limit)
.limit(Number(limit));
res.json({ data: vehicles, total, page: Number(page), limit: Number(limit) });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


exports.getVehicle = async (req, res) => {
try {
const v = await Vehicle.findById(req.params.id);
if (!v) return res.status(404).json({ message: 'Not found' });
res.json(v);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


exports.createVehicle = async (req, res) => {
try {
const vehicle = new Vehicle({ ...req.body, createdBy: req.user._id });
await vehicle.save();
res.status(201).json(vehicle);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


exports.updateVehicle = async (req, res) => {
try {
const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!v) return res.status(404).json({ message: 'Not found' });
res.json(v);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


exports.deleteVehicle = async (req, res) => {
try {
await Vehicle.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};