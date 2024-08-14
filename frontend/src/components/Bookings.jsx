import React from 'react';
import ticketImage from '../assets/images/ticket.png'; // Import your ticket image

const Bookings = ({ item }) => {
    return (
        <div className="ticket-card-mybookings">
            <img src={ticketImage} alt="Ticket" className="ticket-image" />
            <div className="ticket-info">
            <h3>{item.name}</h3>
            <p>Student ID: {item.student_id}</p>
            <p>Bus No: {item.bus_no}</p>
            <p>Date of Journey: {new Date(item.date_of_journey).toLocaleDateString()}</p>
            <p>Ticket Type: {item.ticket_type}</p>
            </div>
        </div>
    );
};

export default Bookings;
