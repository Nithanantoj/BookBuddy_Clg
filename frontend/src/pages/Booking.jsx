import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import bus_img from "../assets/images/bus.png";
import ticket_img from "../assets/images/ticket.png";
import axios from "axios";
import { toast } from "react-toastify";

const Booking = () => {
    const tickets = useSelector(state => state.tickets.items);
    const quantity = useSelector(state => state.tickets.quantitys);
    const token = useSelector(state => state.user.token)

    //console.log(quantity)
    const [count, setCount] = useState(0);
    const [passengers, setPassengers] = useState([]);
    const [ticket_count, setTicket_count] = useState(quantity);
    const [currentPassenger, setCurrentPassenger] = useState(1);
    const [totalPrice, setTotalPrice] = useState(tickets.ticket_price);
    const [passengerDetails, setPassengerDetails] = useState({
        student_id: '',
        name: '',
        bus_no: '',
        ticket_type: 'one_way',
        date_of_journey: '',
        ticket_id : tickets.ticket_id
    });

    useEffect(() => {
        const basePrice = tickets.ticket_price;
        const multiplier = passengerDetails.ticket_type === 'up_and_down' ? setTotalPrice(totalPrice + basePrice ) : setTotalPrice(totalPrice);
        if(!multiplier && count >= 1) {
            setTotalPrice(totalPrice + basePrice)
        }
        setCount(count + 1)
    }, [passengerDetails.ticket_type, currentPassenger]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassengerDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    
    const handleNext = () => {
        setPassengers(prevPassengers => [...prevPassengers, passengerDetails]);
        setPassengerDetails({
            student_id: '',
            name: '',
            bus_no: '',
            ticket_type: 'one_way',
            date_of_journey: '',
            ticket_id : tickets.ticket_id
        });

        setCurrentPassenger(currentPassenger + 1);
    
    };
    

    const handleBooking = async () => {
        if (currentPassenger === ticket_count ) {
            const finalPassengers = [...passengers, passengerDetails];
            console.log('Final Passenger List:', finalPassengers);
    
            try {
                const payload = {
                    tickets: finalPassengers
                };
    
                const res = await axios.post("http://localhost:3000/booking", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                toast.success("Booking Successful!");
                showBookedTicketNotification(payload);
                console.log(res);
            } catch (err) {
                toast.error(err.response?.data?.message || "Booking failed!");
                console.log(err);
            }
        } else {
            toast.warn("Please fill in details for all passengers.");
        }
    };

    const showBookedTicketNotification = (booking) => {
        toast.info(
            
                <div className="ticket-card-noti">
                    <img className='ticket_img-noti' src={ticket_img} alt="Ticket" />
                    <div>
                        <p className='destination'>{tickets.destination}</p>
                        <p className='price'>Total Price: Rs {totalPrice}</p>
                        <p>Passenger Count: {ticket_count}</p>
                    </div>
                </div>,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    };
    
    


    return (
        <>
            <div className='ticket_parent'>
                <div className="ticket_parent_left">
                    <img src={bus_img} alt="Bus" />
                </div>
                <div className='ticket_parent_right'>
                    <div className="ticket-card-booking">
                        <div className="ticket-card-header">
                            <img className='ticket_img' src={ticket_img} alt="Ticket" /> 
                            <div>
                                <p className='destination'>{tickets.destination}</p>
                                <p className='price'>Rs {tickets.ticket_price} </p>
                                <p>Tickets: {quantity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="passenger_details_card">
                        <form>
                            <div className="passenger_details_card_flex">
                            <div className="form-group">
                                <label htmlFor="student_id">Student ID:</label>
                                <input 
                                    type="text" 
                                    name="student_id" 
                                    value={passengerDetails.student_id} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={passengerDetails.name} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            </div>
                            <div className="passenger_details_card_flex">
                            <div className="form-group">
                                <label htmlFor="bus_no">Bus No:</label>
                                <select 
                                    name="bus_no" 
                                    value={passengerDetails.bus_no} 
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Bus No</option>
                                    {tickets.bus_nos.map(bus => (
                                        <option key={bus._id} value={bus.bus_no}>
                                            {bus.bus_no}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticket_type">Ticket Type:</label>
                                <select 
                                    name="ticket_type" 
                                    value={passengerDetails.ticket_type} 
                                    onChange={handleInputChange}
                                >
                                    <option value="one_way">One Way</option>
                                    <option value="up_and_down">Up and Down</option>
                                </select>
                            </div>
                            </div>
                            <div className="passenger_details_card_flex">
                            <div className="form-group">
                                <label htmlFor="date_of_journey">Date of Journey:</label>
                                <input 
                                    className="input_DOJ"
                                    type="date" 
                                    name="date_of_journey" 
                                    value={passengerDetails.date_of_journey} 
                                    min={new Date().toISOString().split('T')[0]} 
                                    max={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    onChange={handleInputChange} 
                                    disabled={new Date().getHours() > 16 && passengerDetails.date_of_journey === new Date().toISOString().split('T')[0]} 
                                />
                            </div>
                            </div>
                        </form>
                        <div className="passenger_details_card_flex">
                        <div className="price-label">
                            <p>Total Price: Rs {totalPrice}</p>
                        </div>
                        <div className="button-group">
                        {currentPassenger < ticket_count ? (
                            <button 
                                onClick={handleNext}
                                className="next_button" 
                            >
                                Next
                            </button>
                        ) : (
                            <button 
                                className="book_now_button"
                                onClick={handleBooking}
                            >
                                Book Now
                            </button>
                        )}
                        </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    );
};

export default Booking;
