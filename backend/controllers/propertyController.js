const mongoose = require('mongoose');
const Property = require('../models/Property');

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasValue = (v) => v !== undefined && v !== '';

// Returns the property, or sends a 400/404 response and returns null.
const findOr404 = async (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: 'Invalid property ID' });
    return null;
  }
  const property = await Property.findById(id);
  if (!property) {
    res.status(404).json({ success: false, message: 'Property not found' });
    return null;
  }
  return property;
};

// GET /api/properties?search=&location=&type=&status=&minPrice=&maxPrice=
exports.getProperties = async (req, res, next) => {
  try {
    const { search, location, type, status, minPrice, maxPrice } = req.query;
    const query = {};

    if (typeof search === 'string' && search.trim()) {
      query.propertyName = { $regex: escapeRegex(search.trim()), $options: 'i' };
    }
    if (typeof location === 'string' && location.trim()) {
      query.location = { $regex: escapeRegex(location.trim()), $options: 'i' };
    }
    if (typeof type === 'string' && type) query.propertyType = type;
    if (typeof status === 'string' && status) query.status = status;

    if (hasValue(minPrice) || hasValue(maxPrice)) {
      query.price = {};
      if (hasValue(minPrice)) {
        if (isNaN(Number(minPrice))) return res.status(400).json({ success: false, message: 'minPrice must be a number' });
        query.price.$gte = Number(minPrice);
      }
      if (hasValue(maxPrice)) {
        if (isNaN(Number(maxPrice))) return res.status(400).json({ success: false, message: 'maxPrice must be a number' });
        query.price.$lte = Number(maxPrice);
      }
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (err) {
    next(err);
  }
};

// GET /api/properties/:id
exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await findOr404(req.params.id, res);
    if (!property) return;
    res.status(200).json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

// POST /api/properties
exports.createProperty = async (req, res, next) => {
  try {
    const data = { ...req.body };
    ['bedrooms', 'bathrooms'].forEach((f) => {
      if (data[f] === '' || data[f] === null) delete data[f];
    });
    const property = await Property.create(data);
    res.status(201).json({ success: true, message: 'Property created', data: property });
  } catch (err) {
    next(err);
  }
};

// PUT /api/properties/:id
exports.updateProperty = async (req, res, next) => {
  try {
    const property = await findOr404(req.params.id, res);
    if (!property) return;

    const fields = ['propertyName', 'propertyType', 'description', 'location', 'price', 'area', 'status'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) property[f] = req.body[f];
    });
    // bedrooms/bathrooms: empty value clears them (e.g. Commercial property)
    ['bedrooms', 'bathrooms'].forEach((f) => {
      if (req.body[f] === '' || req.body[f] === null) property[f] = undefined;
      else if (req.body[f] !== undefined) property[f] = req.body[f];
    });

    const updated = await property.save();
    res.status(200).json({ success: true, message: 'Property updated', data: updated });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/properties/:id/status
exports.updateStatus = async (req, res, next) => {
  try {
    const property = await findOr404(req.params.id, res);
    if (!property) return;
    property.status = req.body.status;
    await property.save();
    res.status(200).json({ success: true, message: 'Status updated', data: property });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/properties/:id
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await findOr404(req.params.id, res);
    if (!property) return;
    await property.deleteOne();
    res.status(200).json({ success: true, message: 'Property deleted', data: { _id: property._id } });
  } catch (err) {
    next(err);
  }
};
