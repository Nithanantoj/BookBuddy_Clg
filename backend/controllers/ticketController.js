const Ticket = require('../models/ticketModel')
const Bus = require("../models/busModel")
const User = require("../models/userModel") 


const get_all_tickets = async (req, res) => {
    try {
        
        const tickets = await Ticket.find();

    
        const ticketsWithCount = await Promise.all(tickets.map(async (ticket) => {
            const busNos = ticket.bus_nos.map(bus => bus.bus_no);

        
            const buses = await Bus.find({ bus_no: { $in: busNos } });

        
            let count_tickets = 0;
            buses.forEach(bus => {
                count_tickets += bus.tickets_available;
            });

            return {
                ...ticket.toObject(),
                ticketCount: count_tickets
            };
        }));

        res.json(ticketsWithCount);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const create_new_ticket = async (req, res) => {
    const ticket = new Ticket(req.body);
    try {
        const newTicket = await ticket.save();
        res.status(201).json({message : "ticket added successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const get_ticket_by_id = async (req, res) => {
    const { ticket_id } = req.params;

    try {
        const ticket = await Ticket.findOne({ ticket_id });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const busNumbers = ticket.bus_nos;

        const buses = await Bus.find({ bus_no: { $in: busNumbers } });

      
        const inchargeIds = buses.map(bus => bus.incharge_id);

     
        const incharges = await User.find({ user_id: { $in: inchargeIds } });
        console.log(incharges)
      
        const inchargeMap = incharges.map(incharge => ({
            user_id: incharge.user_id,
            username: incharge.username,
            contact_no: incharge.contact_no
        }));
        console.log(inchargeMap)

       
        const result = {
            ticket_id: ticket.ticket_id,
            ticket_destination: ticket.destination,
            ticket_price: ticket.ticket_price,
            bus_details: buses.map(bus => ({
                bus_no: bus.bus_no,
                bus_route: bus.bus_route,
                available_tickets : bus.tickets_available,
                driver_name: bus.driver_name,
                driver_contact: bus.driver_contact,
                incharge_detail: inchargeMap.map(user => {
                    const incharge =  inchargeMap.find(user.user_id == bus.incharge_id)
                return {
                    incharge_id: incharge.user_id,
                    incharge_name: incharge.username,
                    incharge_contact: incharge.contact_no
                 };}),
            }))
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update_ticket_by_id = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({message : 'Ticket updated Successfuly'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const delete_ticket_by_id = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    get_all_tickets,
    create_new_ticket,
    get_ticket_by_id,
    update_ticket_by_id,
    delete_ticket_by_id
};