const { body, validationResult } = require('express-validator');

// required=true for POST (all fields needed), false for PUT (only validate what is sent)
const baseRules = (required) => {
  const field = (name) => (required ? body(name) : body(name).optional());
  return [
    field('propertyName').isString().withMessage('Property name must be text').bail().trim().notEmpty().withMessage('Property name is required'),
    field('propertyType').isIn(['Residential', 'Commercial']).withMessage('Property type must be Residential or Commercial'),
    field('description').isString().withMessage('Description must be text').bail().trim().notEmpty().withMessage('Description is required'),
    field('location').isString().withMessage('Location must be text').bail().trim().notEmpty().withMessage('Location is required'),
    field('price').isFloat({ min: 0 }).withMessage('Price must be a number >= 0'),
    field('area').isFloat({ min: 1 }).withMessage('Area must be a number > 0'),
    body('bedrooms').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Bedrooms must be a whole number >= 0'),
    body('bathrooms').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Bathrooms must be a whole number >= 0'),
    body('status').optional().isIn(['Available', 'Sold', 'Rented']).withMessage('Status must be Available, Sold or Rented'),
  ];
};

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const validateCreate = [...baseRules(true), handleValidation];
const validateUpdate = [...baseRules(false), handleValidation];
const validateStatus = [
  body('status').isIn(['Available', 'Sold', 'Rented']).withMessage('Status must be Available, Sold or Rented'),
  handleValidation,
];

module.exports = { validateCreate, validateUpdate, validateStatus };
