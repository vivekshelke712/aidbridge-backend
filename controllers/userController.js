const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");  // Import mongoose
const HelpRequest = require("../models/HelpRequest");

// Controller to get all requests for a specific user
const getUserRequests = asyncHandler(async (req, res) => {
    const { userId } = req.params;  // Get the userId from the URL
  
    // Ensure that the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });  // Return error if invalid
    }
  
    try {
        // Fetch requests from the database based on the userId
        const data = await HelpRequest.find({ userId: new mongoose.Types.ObjectId(userId) });  // Corrected line
  
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No requests found for this user." });
        }
      
        // Return the data in the response
        res.status(200).json({ data });
    } catch (err) {
        // Handle potential database errors
        console.error(err);
        res.status(500).json({ message: "Server error while fetching requests." });
    }
});

module.exports = { getUserRequests };
