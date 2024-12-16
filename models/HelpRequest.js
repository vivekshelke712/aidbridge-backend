const mongoose = require('mongoose');

// Define the HelpRequest schema
const helpRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 100 },
    email:{type: String , required:true},
    needType: { type: String, required: true },
    contact: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    organization: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }, // Assuming Organization is another model in your app
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Assuming User is another model
  },
  { timestamps: true }
);

// Create the model based on the schema
const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);

module.exports = HelpRequest;
