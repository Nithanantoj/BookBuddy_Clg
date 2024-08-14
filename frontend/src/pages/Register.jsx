import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setName] = useState("");
    const [user_id, setUser_id] = useState("");
    const [role, setRole] = useState("Student");
    const [contact_no, setcontact_no] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();

       try {
            const payload = {
                username,
                user_id,
                contact_no,
                role,
                password,
                email
            }
            const res = await axios.post("http://localhost:3000/register", payload);

            console.log(res)
            
            toast.success("Registration Successful!");
            navigate('/login')

        } catch (error) {
            toast.error(error.response.data.message);
    
    }
    }

    return (
        <>
        <div className="container">
        <div className="register-container">
            <h2>Register Here</h2>
            <form onSubmit={handleRegister}>
            <div className="reg_flex">
            <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="name"
                        id="name"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_id">Student/Staff Id:</label>
                    <input
                        type="user_id"
                        id="user_id"
                        placeholder="22CS000"
                        value={user_id}
                        onChange={(e) => setUser_id(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="reg_flex">
                <div className="form-group_role">
                    <label htmlFor="role">Who are you:</label>
                    <select id="role" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)
                    }>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="contact_no">Phone Number:</label>
                    <input
                        type="contact_no"
                        id="contact_no"
                        placeholder="9876543210"
                        value={contact_no}
                        onChange={(e) => setcontact_no(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@sece.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/request">Log In</Link></p>
            </form>
        </div>
        </div>
        </>
    )
}

export default Register;