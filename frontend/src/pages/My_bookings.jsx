import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import bus_img from "../assets/images/bus.png";
import Bookings from "../components/Bookings";

const My_bookings = () => {
    const [tickets, setTickets] = useState([]);
    const token = useSelector((state) => state.user.token);
    console.log(token);

    useEffect(() => {
        if (token) {
            getTickets();
        }
    }, [token]);

    const getTickets = async () => {
        try {
            const res = await axios.get("http://localhost:3000/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data); // For debugging
            setTickets(res.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    return (
        <>
            <div className='ticket_parent'>
                <div className="ticket_parent_left">
                    <img src={bus_img} alt="Bus" />
                </div>
                <div className='ticket_parent_right'>
                    {tickets.length > 0 ? (
                        tickets.map((item) => (
                            <Bookings key={item._id} item={item} />
                        ))
                    ) : (
                        <p>No tickets available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default My_bookings;
