import bus_img from "../assets/images/bus.png"
import { BiSolidBusSchool } from "react-icons/bi";

const About = () => {
    return (
        <div className='ticket_parent'>
        <div className="ticket_parent_left">
            <img src={bus_img} />
        </div>
      <div className="about-container">
        <h1>Welcome to Bookbuddy<BiSolidBusSchool className="bus_icon1"/> </h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to enhance the convenience and efficiency of the transport system provided by our college.
            We understand the challenges faced by students in securing transport tickets and the administrative burden 
            on staff managing these tickets. Our platform addresses these challenges by offering a user-friendly interface 
            and robust features for managing bus schedules, ticket bookings, and validations.
          </p>
        </section>
  
        <section className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li>Effortless Ticket Booking: Students can easily book tickets for their desired buses through our intuitive web application.</li>
            <li>Real-Time Ticket Validation: Bus in-charges can quickly validate tickets using our system, ensuring smooth boarding processes.</li>
            <li>Comprehensive Bus Management: Administrators can efficiently manage bus schedules, details, and bus in-charge assignments.</li>
            <li>Secure User Access: Our platform provides secure login and authentication, with role-based access for students, bus in-charges, and administrators.</li>
          </ul>
        </section>
  
        <section className="about-section">
          <h2>Get in Touch</h2>
          <p>We are always open to feedback and suggestions. If you have any questions or need support, please feel free to reach out to us at <a href="#"> nithananto.j2022cse@sece.ac.in </a></p>
        </section>
      </div>
      </div>
    );
  };
  
  export default About;