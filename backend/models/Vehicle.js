const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
model: { type: String, required: true, index: true },
type: { type: String, required: true, enum: ['Car', 'Bike', 'SUV', 'Van'] },
pricePerHour: { type: Number, required: true },
availability: { type: Boolean, default: true },
description: { type: String },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Vehicle', vehicleSchema);