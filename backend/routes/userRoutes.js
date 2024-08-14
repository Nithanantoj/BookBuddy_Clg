const express = require('express')
const router = express.Router()
const { register_User, login_User, request_User } = require('../controllers/userController')


router.post("/register", register_User);
router.post("/login", login_User);
router.post("/request", request_User);

module.exports = router;