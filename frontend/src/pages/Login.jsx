import { useState } from "react"

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


import axios from "axios"


import { toast } from "react-toastify"

import { useDispatch } from "react-redux"
import { setToken } from "../redux/userSlice"



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const payload = { email, password };
            const res = await axios.post("http://localhost:3000/login", payload);
            console.log("Login => ", res);
    
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            dispatch(setToken({ token: res.data.token, role: res.data.role }));
            
            const role = res.data.role;
            console.log("Role => ", role);
            if (role === 'Incharge') {
                navigate('/welcome');
            } else if (role === 'Student') {
                navigate('/tickets');
            } 
    
            toast.success("Login Successful");
    
            
            
        } catch (err) {
            toast.error(err.response.data.msg);
            console.log("Error => ", err);
        }
    };
    return (
        <>
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/request">Register</Link></p>
            </form>
        </div>
        </>
    )
}

export default Login;