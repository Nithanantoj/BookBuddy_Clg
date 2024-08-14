const mongoose = require('mongoose')

const ticketschema = new mongoose.Schema({
    ticket_id : {
        type: String,
        required: true,
        unique: true
    },
    destination : {
        type: String,
        required: true
    },
    ticket_price : {
        type: Number,
        required: true
    },
    bus_nos : [{
        bus_no : Number
    }],
})

module.exports = mongoose.model('Ticket', ticketschema)



