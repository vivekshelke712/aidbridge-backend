const asyncHandler = require("express-async-handler")

const User = require('../models/user')


const HelpRequest = require('../models/HelpRequest'); // Adjust the path as per your project structure

// Controller to get all help requests
exports.getAllRequestsAdmin = async (req, res) => {
  try {
    // Fetch all requests from the HelpRequest model
    const requests = await HelpRequest.find();

    // If no requests found, return a message
    if (!requests.length) {
      return res.status(404).json({ message: "No requests found" });
    }

    // Return the list of requests
    res.status(200).json({ result: requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = asyncHandler(async(req,res)=> {
    const result = await User.find()
    res.status(200).json({message:"users Fetch SuccessFully",result})
} )



