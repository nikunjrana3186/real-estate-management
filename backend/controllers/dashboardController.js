const Property = require('../models/Property');

// GET /api/dashboard  (calculated with one aggregation, nothing hardcoded)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [result] = await Property.aggregate([
      {
        $group: {
          _id: null,
          totalProperties: { $sum: 1 },
          availableProperties: { $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] } },
          soldProperties: { $sum: { $cond: [{ $eq: ['$status', 'Sold'] }, 1, 0] } },
          rentedProperties: { $sum: { $cond: [{ $eq: ['$status', 'Rented'] }, 1, 0] } },
          totalPropertyValue: { $sum: '$price' },
        },
      },
      { $project: { _id: 0 } },
    ]);

    // Empty database: aggregate returns [], so we return zeros
    const stats = result || {
      totalProperties: 0,
      availableProperties: 0,
      soldProperties: 0,
      rentedProperties: 0,
      totalPropertyValue: 0,
    };
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};
