const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express() 
require("dotenv").config({path:'./.env'})


// Connect Database
mongoose.connect(process.env.MONGO_URL)

// MiddleWares => to access the data of body
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

// Routes
app.use('/api/v1/auth',require('./routes/authroute'))
app.use('/api/v1/org',require('./routes/organizationRoute'))
app.use('/api/v1/help',require('./routes/HelpRequestRoute'))
app.use('/api/v1/admin',require('./routes/adminRoute'))
app.use('/api/v1/user',require('./routes/userRoute'))

// 404
app.use("*", (req, res) => {
    res.status(404).json({message: "resource not found"})
})
// Error Handlers
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({message: err.message})
})



// Connect to the server
mongoose.connection.once("open", () => {
    console.log("Mongo Conncted");
    app.listen(process.env.PORT,console.log(`Server Running : http://localhost:${process.env.PORT}`))
})