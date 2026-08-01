const express = require('express');

const router = express.Router();

const aiController = require('../controllers/aiController');

router.get('/:medicine_id', aiController.recommendMedicine);

module.exports = router;