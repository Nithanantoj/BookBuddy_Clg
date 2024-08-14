const express = require('express')
const router = express.Router()
const { getAllBookings, createNewBooking, getTodaysJourneys, updateJourneyStatus} = require('../controllers/bookinController')
const auth = require("../middlewares/auth")

router.get("/bookings", auth, getAllBookings);
router.post("/booking", auth,createNewBooking);
router.get("/todays-journeys", auth, getTodaysJourneys);
router.put("/booking/:id", auth, updateJourneyStatus);

module.exports = router;