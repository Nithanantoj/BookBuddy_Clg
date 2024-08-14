import { FaLocationDot } from "react-icons/fa6";
import Bus from './Bus';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {addTicket, addQuantity} from "../redux/ticketSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Tickets = (props) => {
    console.log(props.item)
    const dispatch = useDispatch();
    const navigate = useNavigate("")
    
    const [ticket_count, setTicket_count] = useState(1);


    const handleincrease = () => {
        if (ticket_count < props.item.ticketCount) {
            setTicket_count(ticket_count + 1);
        }
    }

   

    const handledecrease = () => {
        if (ticket_count > 1) {
            setTicket_count(ticket_count - 1);
        }
    }

    const handle_book = (e) => {
        e.preventDefault();

        dispatch(addTicket(props.item))
        dispatch(addQuantity(ticket_count))
        navigate('/booking')
    }


    return (
        <div className="ticket-card">
            <div className="ticket-card-header">
            <FaLocationDot className='location_icon' color="#f9b318" />
            <div>
            <p className='destination'>{props.item.destination}</p>
            <p className='price'>Rs {props.item.ticket_price}</p>
            <p>Tickets Available: {props.item.ticketCount}</p>
            <div className="count-btn">
                <button onClick={handledecrease}>-</button>
                <p> {ticket_count} </p>
                <button onClick={handleincrease}>+</button>
            </div>
            </div>
            

            </div>
            <button className="Book_Now" onClick={handle_book}>Book Now</button>
        </div>
        
    )
}

export default Tickets;