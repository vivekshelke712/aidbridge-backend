const express = require('express');
const { createHelpRequest, getHelpRequestByEmail, updateHelpRequestStatus, getRequestDetails } = require('../controllers/HelpRequestController');

// console.log('createHelpRequest:', createHelpRequest); // Should not be undefined
// console.log('getHelpRequestByEmail:', getHelpRequestByEmail);  // Should not be undefined

const router = express.Router();

router.get('/getHelpRequestByEmail/:email',getHelpRequestByEmail);
router.post('/help-request', createHelpRequest);
router.patch('/helpRequests/:id', updateHelpRequestStatus);
router.get('/requests/:requestId', getRequestDetails);

module.exports = router;