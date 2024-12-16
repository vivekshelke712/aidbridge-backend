const mongoose = require("mongoose");

// Static cities and their respective areas
const staticCities = {
  Pune: ["Shivaji Nagar", "Kothrud", "Baner"],
  Mumbai: ["Andheri", "Bandra", "Dadar"],
  Bangalore: ["Whitefield", "Indiranagar", "Koramangala"],
  Delhi: ["Connaught Place", "Karol Bagh", "Saket"],
  Chennai: ["T. Nagar", "Velachery", "Adyar"],
};

const orgSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
    },
    orgEmail: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      enum: Object.keys(staticCities), // Static city names
      required: true,
    },
    area: {
      type: String,
      required: function () {
        return this.city in staticCities; // Area is required if the city exists in staticCities
      },
      validate: {
        validator: function (value) {
          return staticCities[this.city]?.includes(value);
        },
        message: "Invalid area for the selected city.",
      },
    },
    description: {
      type: String,
      required: true,
    },
    orgType: {
      type: String,
      required: true,
      enum: ["AnimalShelter", "OldAgeHome", "EducationalHelp"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("organization", orgSchema);
