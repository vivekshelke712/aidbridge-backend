const express = require("express")
const {getAllOrganizations, getOrganizationsByCity, getAllCities, getAllRequest, findOrganizationByEmail} = require('../controllers/organizationController')
const router = express.Router()

router.get('/getAllOrganizations',getAllOrganizations)
router.get('/getOrganizationbyCity/:city', getOrganizationsByCity);
router.get('/getAllCities', getAllCities);
router.get('/getAllRequest/:id',getAllRequest)
router.get('/findOrganizationByEmail/:email',findOrganizationByEmail)

module.exports = router
