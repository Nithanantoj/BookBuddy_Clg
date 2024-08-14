const Bus = require('../models/busModel')

const delete_ticket_count = async(bus_no) => {
    try {
        const bus = await Bus.findOne({bus_no});
        bus.tickets_available--;

        bus.save();

        console.log("Ticket count updated successfully");
    }catch(err){
        console.log(err)
    }
};

module.exports = {delete_ticket_count};