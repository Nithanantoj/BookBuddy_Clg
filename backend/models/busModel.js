const mongoose = require('mongoose')

const busschema = new mongoose.Schema({
    bus_no : {
        type: Number,
        required: true
    },
    bus_route : {
        type: String,
        required: true
    },
    tickets_available :{
        type: Number,
        required: true
    },
    driver_name : {
        type: String,
        required: true
    },
    driver_contact : {
        type: String,
        required: true
    },
    incharge_id : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Bus', busschema)