const express = require('express')
const router = express.Router()
const { get_all_tickets, create_new_ticket, get_ticket_by_id, update_ticket_by_id, delete_ticket_by_id} = require('../controllers/ticketController')
const auth = require('../middlewares/auth')

router.get("/tickets", get_all_tickets);
router.post("/ticket", create_new_ticket);
router.get("/ticket/:ticket_id", get_ticket_by_id);
router.put("/ticket/:id", update_ticket_by_id);
router.delete("/ticket/:id", delete_ticket_by_id);

module.exports = router;