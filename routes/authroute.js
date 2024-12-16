const { register, login, logout, orgRegister, orgLogin, orgLogout } = require('../controllers/authController')

const router = require('express').Router()

router 
    .post("/register", register)
    // .post("/register/organization", organizationRegister)
    .post("/login", login)
    .post("/logout", logout)
    .post("/orgregister", orgRegister)

// Login organization
    .post("/orglogin", orgLogin)

// Logout organization
    .post("/orglogout", orgLogout)
    
module.exports = router    