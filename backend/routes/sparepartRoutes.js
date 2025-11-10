const express = require('express');
const router = express.Router();
const {
  getAllSpareparts,
  getSparepart,
  createSparepart,
  updateSparepart,
  deleteSparepart
} = require('../controllers/sparepartController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getAllSpareparts)
  .post(authorize('admin', 'spv'), createSparepart);

router.route('/:id')
  .get(getSparepart)
  .put(authorize('admin', 'spv'), updateSparepart)
  .delete(authorize('admin'), deleteSparepart);

module.exports = router;