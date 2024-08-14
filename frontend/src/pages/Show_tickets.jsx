import {Ticket_details} from '../details_sample'
import Tickets from "../components/Tickets";
import bus_img from "../assets/images/bus.png"
import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';
import axios from 'axios';


const Show_tickets = () => {

    const [tickets, setTickets] = useState([]);
    const token = useSelector((state) => state.user.token);
    console.log(token)

    useEffect(() => {
        getTickets();
    },[token]);

    const getTickets = async() => {
        const res = await axios.get("http://localhost:3000/tickets", {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        console.log(res.data)
        setTickets(res.data);
    }

    console.log(tickets)
    return (
        <>
        <div className='ticket_parent'>
        <div className="ticket_parent_left">
            <img src={bus_img} />
        </div>
        <div className='ticket_parent_right'>

        {tickets.map((item) => <Tickets key={item._id} item ={item}/>)}
        </div>
        </div>
        </>
    )
}

export default Show_tickets;