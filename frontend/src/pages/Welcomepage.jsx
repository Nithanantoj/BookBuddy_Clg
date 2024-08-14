import { BiSolidBusSchool } from "react-icons/bi";
import bus_img from "../assets/images/bus.png"
import { Link } from "react-router-dom";

const Welcomepage = () => {
    return (
        <>
        <div className='ticket_parent'>
        <div className="ticket_parent_left">
            <img src={bus_img} />
        </div>
        <div className='ticket_parent_right'>
            <div className="welcome-container">
            <h1>Welcome to Bookbuddy <BiSolidBusSchool className="bus_icon"/> Portal</h1>
            <Link to='/today-bookings' className="link"><button>Today's Bookings</button></Link>
            </div>
        </div>
        </div>
        </>
    )
}

export default Welcomepage;