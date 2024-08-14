const mongoose = require('mongoose')

const bookingschema = new mongoose.Schema({
    booking_id : {
        type: String,
        required: true,
        unique: true
    },
    user_id : {
        type: String,
        required: true
    },
    tickets:[{
        ticket_id : {
            type: String,
            required: true
        },
        name : {
            type: String,
            required: true
        },
        student_id : {
            type: String,
            required: true
        },
        bus_no : {
            type: Number,
            required: true
        },
        date_of_journey : {
            type: Date,
            required: true
        },
        ticket_type : {
            type: String,
            enum : ["one_way", "up_and_down"],
            required: true
        },
        journey_status : {
            type: String,
            enum : ["Confirmed", "Cancelled", "Completed"],
            default : "Confirmed"
        }
    }],
    booking_date : {
        type: Date,
        default : Date.now(),
        required: true
    }
})

module.exports = mongoose.model('Booking', bookingschema)

