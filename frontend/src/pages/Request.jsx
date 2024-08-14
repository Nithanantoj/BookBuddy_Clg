import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Request = () => {
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.endsWith('@sece.ac.in')) {
            try {
                const payload = {
                    email : email
                }

                const response = await axios.post("http://localhost:3000/request", payload)
                
                console.log(response)

                if (response.data.success) {
                    setMessage(`Hi Eshwarit, we have sent the registration link to your email (${email}). Please click on the link to register.`);
                } else {
                    setMessage("Failed to send email. Please try again later.");
                }
            } catch (error) {
                setMessage("An error occurred. Please try again later.");
            }
            setShowModal(true);
        } else {
            setMessage("Please use an official SECE email id (example@sece.ac.in).");
            setShowModal(true);
        }
    };


    const closeModal = () => {
        setShowModal(false); 
    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email: (use official mail id)</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@sece.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Request;
