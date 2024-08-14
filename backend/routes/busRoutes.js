const express = require('express')
const router = express.Router()
const { getBuses, getBusById, createBus, updateBus, deleteBus } = require("../controllers/busController");


router.get("/buses", getBuses);
router.get("/bus/:id", getBusById);
router.post("/bus", createBus);
router.put("/bus/:id", updateBus);
router.delete("/bus/:id", deleteBus);


module.exports = router;