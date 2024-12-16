const AsyncHandler = require("express-async-handler")
const Organization = require("../models/Organization")
const HelpRequest = require("../models/HelpRequest")

exports.getAllOrganizations = AsyncHandler(async(req,res)=> {
    const result = await Organization.find()
    res.status(200).json({message:"organizations Fetch SuccessFully",result})
} )
exports.getOrganizationsByCity = AsyncHandler(async (req, res) => {
    const { city } = req.params; // Extract city from request parameters
    console.log("City received from params:", city); // Debug log

    // Query organizations by city
    const organizations = await Organization.find({ city });

    console.log("Organizations fetched:", organizations); // Debug log

    if (organizations.length === 0) {
        return res.status(404).json({ message: "No organizations found in this city." });
    }

    res.status(200).json({ message: "Organizations fetched successfully", organizations });
});


exports.getAllCities = AsyncHandler(async (req, res) => {
    const cities = await Organization.distinct('city'); // Get unique cities

    if (cities.length === 0) {
        return res.status(404).json({ message: "No cities found." });
    }

    res.status(200).json({ message: "Cities fetched successfully", cities });
});


exports.getAllRequest = AsyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter

    // Validate the ID (you can add more validation as needed)
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        // Fetch data based on the orgId
        const data = await HelpRequest.find({ orgId: id }); // Use orgId as per your schema

        // Check if data exists
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No data found for the given ID' });
        }

        // Return the data
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

exports.findOrganizationByEmail = AsyncHandler(async (req, res) => {
    const { email } = req.params; // Get email from request parameters
  
    const result = await Organization.find({ orgEmail:email });
  
    if (!result) {
      return res.status(404).json({ message: 'Organization not found' });
    }
  
    return res.status(200).json({message: "Organizatio found successful",result});
  });
  
  
