const express = require("express");
const { getUserRequests } = require("../controllers/userController");

const router = express.Router();

// Define the route to get all requests of a specific user
router.get("/requests/:userId", getUserRequests);

module.exports = router;