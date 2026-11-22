const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: [true, 'Property name is required'],
      trim: true,
      maxlength: [120, 'Property name cannot exceed 120 characters'],
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: { values: ['Residential', 'Commercial'], message: 'Property type must be Residential or Commercial' },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    area: {
      type: Number,
      required: [true, 'Area (sq ft) is required'],
      min: [1, 'Area must be greater than 0'],
    },
    bedrooms: { type: Number, min: [0, 'Bedrooms cannot be negative'] },
    bathrooms: { type: Number, min: [0, 'Bathrooms cannot be negative'] },
    status: {
      type: String,
      enum: { values: ['Available', 'Sold', 'Rented'], message: 'Status must be Available, Sold or Rented' },
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
