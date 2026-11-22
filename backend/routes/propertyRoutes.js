const express = require('express');
const router = express.Router();
const c = require('../controllers/propertyController');
const { validateCreate, validateUpdate, validateStatus } = require('../middleware/validateProperty');

router.route('/').get(c.getProperties).post(validateCreate, c.createProperty);
router.route('/:id').get(c.getPropertyById).put(validateUpdate, c.updateProperty).delete(c.deleteProperty);
router.patch('/:id/status', validateStatus, c.updateStatus);

module.exports = router;
