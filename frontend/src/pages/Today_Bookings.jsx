import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import bus_img from "../assets/images/bus.png"


const Today_Bookings = () => {
    const [journeys, setJourneys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        // Fetch today's journey details from the backend
        const fetchJourneys = async () => {
            try {
                const response = await axios.get('http://localhost:3000/todays-journeys', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }); // Adjust the URL as needed
                setJourneys(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchJourneys();
    }, []);

    const handleStatusChange = async (ticket_id, status) => {
        try {
            await axios.put(`http://localhost:3000/booking/${ticket_id}`, { journey_status: status });
    
            setJourneys(journeys.map(journey => 
                journey.ticket_id === ticket_id ? { ...journey, journey_status: status } : journey
            ));
            alert(`Journey status updated to ${status}`);
        } catch (err) {
            alert('Failed to update journey status');
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='ticket_parent'>
            <div className="ticket_parent_left">
            <img src={bus_img} />
            <h2>Today's Journeys</h2>
            </div>
            <div className='ticket_parent_right'>
            <table>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Destination</th>
                        <th>Bus No</th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {journeys.map((journey, index) => (
                        <tr key={index}>
                            <td>{journey.ticket_id}</td>
                            <td>{journey.ticket_destination}</td>
                            <td>{journey.bus_no}</td>
                            <td>{journey.name}</td>
                            <td>{journey.student_id}</td>
                            <td>{journey.journey_status || 'Confirmed'}</td>
                            <td>
                                <select 
                                    className='tod_button'
                                    value={journey.journey_status || 'Confirmed'} 
                                    onChange={(e) => handleStatusChange(journey.ticket_id, e.target.value)}
                                >
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Today_Bookings;
