const express = require('express');
const router = express.Router();
const { getAllUsers, getAllRequestsAdmin } = require('../controllers/adminController'); // Adjust the path

router.get('/getAllUsers', getAllUsers);
router.get('/getAllRequestAdmin', getAllRequestsAdmin);


module.exports = router;
