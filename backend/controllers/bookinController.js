const Ticket = require("../models/ticketModel")
const Booking = require("../models/bookingModel")
const { v4: uuidv4 } = require('uuid');
const bookingServices = require('../services/bookingServices')


const getAllBookings = async (req, res) => {
    const user_id = req.user.user_id
    const bookings = await Booking.find({ user_id })
    try {
        const tickets_details = bookings.map(booking => booking.tickets);
        const mergedTickets = tickets_details.flat(); 
        //console.log("total => ",mergedTickets.length);

        const currentDate = new Date();

       
        const nonExpiredTickets = mergedTickets.filter(ticket => {
           
            const ticketDate = new Date(ticket.date_of_journey);
            return ticketDate >= currentDate;
        });

        //console.log("nonexpired =>", nonExpiredTickets.length)

        console.log(nonExpiredTickets);
        res.json(nonExpiredTickets);
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createNewBooking = async (req, res) => {
    const user_id = req.user.user_id;
    const {tickets} = new Booking(req.body)
    try {
        const new_ticket = new Booking({
            booking_id:uuidv4(),
            user_id,
            tickets
        })

        await new_ticket.save()

        const bus_nos = tickets.map(ticket => ticket.bus_no)
        console.log(bus_nos)

        for (let index = 0; index < bus_nos.length; index++) {
            await bookingServices.delete_ticket_count(bus_nos[index]);
        }

        res.status(201).json(new_ticket)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}


const getTodaysJourneys = async (req, res) => {
    const role = req.user.role; 
    console.log('User Role:', role);

    if (role !== 'Incharge') {
        console.log('Access Denied: Not Incharge');
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

        console.log('Start of Day:', startOfDay);
        console.log('End of Day:', endOfDay);

        // Find bookings where tickets have a date_of_journey within today's range
        const bookings = await Booking.find({
            'tickets.date_of_journey': {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        console.log('Bookings Found:', bookings);

        // Filter tickets for today and extract ticket IDs
        const ticketIds = bookings.flatMap(booking => 
            booking.tickets
                .filter(ticket => new Date(ticket.date_of_journey).toDateString() === new Date().toDateString())
                .map(ticket => ticket.ticket_id)  // Extract ticket_id
        );

        console.log('Ticket IDs for Today:', ticketIds);

        // Remove duplicates from ticketIds
        const uniqueTicketIds = [...new Set(ticketIds)];
        console.log('Unique Ticket IDs:', uniqueTicketIds);

        // Fetch ticket details from Ticket model
        const tickets = await Ticket.find({ ticket_id: { $in: uniqueTicketIds } });
        console.log('Tickets Details:', tickets);

        // Prepare response data with ticket details
        const responseData = bookings.flatMap(booking => 
            booking.tickets
                .filter(ticket => new Date(ticket.date_of_journey).toDateString() === new Date().toDateString())
                .map(ticket => {
                    const ticketDetails = tickets.find(t => t.ticket_id === ticket.ticket_id);
                    return {
                        ticket_id: ticket.ticket_id,
                        ticket_destination: ticketDetails ? ticketDetails.destination : 'Unknown',
                        bus_no: ticket.bus_no,
                        name: ticket.name,
                        student_id: ticket.student_id
                    };
                })
        );

        console.log('Response Data:', responseData);
        res.json(responseData);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateJourneyStatus = async (req, res) => {
    const { ticket_id } = req.params; // Assuming ticket_id is passed as a URL parameter
    const { journey_status } = req.body; // New status from the request body

    try {
        // Find the booking that contains the ticket with the given ticket_id
        const booking = await Booking.findOne({ 'tickets._id': ticket_id });

        if (!booking) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Find the specific ticket and update its journey_status
        const ticket = booking.tickets.id(ticket_id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.journey_status = journey_status; // Update the journey_status
        await booking.save(); // Save the updated booking

        console.log(`Journey status updated for ticket ${ticket_id} to ${journey_status}`);
        res.json({ message: `Journey status updated to ${journey_status}` });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: error.message });
    }
};





module.exports = { getAllBookings, createNewBooking, getTodaysJourneys, updateJourneyStatus}

