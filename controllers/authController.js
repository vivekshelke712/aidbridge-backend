const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const User = require("../models/user")
const Organization = require("../models/Organization")

exports.register = asyncHandler(async (req,res) => {
  const { name, email, password, role, number } = req.body
  if (!validator.isEmail(email)) {
      return res.status(400).json({message:"Please provide valid email" })
  }
  if (!validator.isStrongPassword(password)) {
      return res.status(400).json({message:"please enter srong password"})
  }
  if (!name) {
      return res.status(400).json({message:"please enter Name"})
  }
  if (!number) {
      return res.status(400).json({message:"enter a valid number"})
  }
  const result = await User.findOne({ email })
  if (result) {
      return res.status(400).json("already user Exist")
  }
  const hashPass = await bcrypt.hash(password, 10)
  await User.create({ ...req.body, password: hashPass })
  res.status(201).json({message: "user Register Success"})
})
exports.login = asyncHandler(async (req,res) => {
    const { email, password } = req.body 
    if (!email || !password) {
        return res.status(400).json({message:"email and password required"})
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({message:"please enter valid email"})
    }

    const result = await User.findOne({ email })
    if (!result) {
        return res.status(400).json({message:"Email is not registerd with us"})
    }

    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({message:"password do not match"})
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    res.cookie('userAuth', token, { maxAge: 1000 * 60 * 60 * 6 })
    
    res.status(200).json({
        message: "Login Success",
        result: {
            id:result._id,
            name: result.name,
            email: result.email,
            role:result.role,
            Active:result.Active
        }
    })
})
exports.logout = asyncHandler(async (req, res) => {
    // await User.deleteMany()
    // res.status(200).json({message:"all user Deleted"})
    res.clearCookie("userAuth")
    res.status(200).json({message: "logout Success"})
})

exports.orgRegister = asyncHandler(async (req, res) => {
  const { orgName, orgEmail, password, number, registrationNumber, address, city, description, orgType,area } = req.body;

  // Input validation
  if (!orgName || !orgEmail || !password || !number || !registrationNumber || !address || !city || !description || !orgType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email already exists in Users or Organizations
  const existingOrg = await Organization.findOne({ orgEmail });
  const existingUser = await User.findOne({ email: orgEmail });
  if (existingOrg || existingUser) {
    return res.status(400).json({ message: "Email already exists. Please use a different email." });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a user for the organization
  const newUser = await User.create({
    name: orgName,
    email: orgEmail,
    password: hashedPassword,
    number,
    role: "organization",
  });

  // Create the organization and associate it with the user
  const newOrg = await Organization.create({
    orgName,
    orgEmail,
    number,
    registrationNumber,
    address,
    city,
    area,
    description,
    orgType,
    user: newUser._id,
  });

  // Update the user's 'active' key to true
  newUser.active = true;
  await newUser.save();

  res.status(201).json({ message: "Organization registered successfully", organization: newOrg });
});


exports.orgLogin = asyncHandler(async (req, res) => {
  const { orgEmail, password } = req.body

  // Check if email and password are provided
  if (!orgEmail || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  // Validate email
  if (!validator.isEmail(orgEmail)) {
    return res.status(400).json({ message: "Please enter a valid email" })
  }

  // Find organization by email
  const organization = await Organization.findOne({ orgEmail })
  if (!organization) {
    return res.status(400).json({ message: "Organization not registered with us" })
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, organization.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Password does not match" })
  }

  // Generate JWT
  const token = jwt.sign({ orgId: organization._id }, process.env.JWT_KEY, { expiresIn: "1d" })

  // Set cookie
  res.cookie("orgAuth", token, { maxAge: 1000 * 60 * 60 * 6, httpOnly: true })

  res.status(200).json({
    message: "Login successful",
    organization: {
      orgName: organization.orgName,
      orgEmail: organization.orgEmail,
      role: organization.role,
      address: organization.address,
    },
  })
})
exports.orgLogout = asyncHandler(async (req, res) => {
  res.clearCookie("orgAuth") // Clear the organization authentication cookie
  res.status(200).json({ message: "Logout successful" })
})

