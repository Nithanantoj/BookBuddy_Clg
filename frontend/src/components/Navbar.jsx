import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import clg_logo from '../assets/images/clg_logo.png';
import { removeToken } from '../redux/userSlice';

const Navbar = () => {
    const [role, setRole] = useState(null);
    const token = useSelector((state) => state.user.token);
    const userRole = useSelector((state) => state.user.role);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token && userRole !== role) {  
            setRole(userRole);
        }
    }, [token, userRole, role]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        dispatch(removeToken());
        navigate('/');
    };

    const handleNavigation = (path) => {
        if (role === 'Incharge' && path !== '/welcome') {
            if (navigate.location.pathname !== '/welcome') {  
                navigate('/welcome');
            }
        } else if (navigate.location.pathname !== path) {  
            navigate(path);
        }
    };

    return (
        <nav className='navbar'>
            <img src={clg_logo} width={50} alt="College Logo" />
            <div>
                <ul>
                    <li><Link to='/tickets'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {role === 'Incharge' && (
                        <>
                            <li><Link to='/today-bookings'>Bookings</Link></li>
                        </>
                    )}
                    {role === 'Student' && (
                        <>
                            <li><Link to='/my-bookings'>MyBookings</Link></li>
                        </>
                    )}
                    {token ? (
                        <li><a onClick={handleLogout}>Log Out</a></li>
                    ) : (
                        <li><Link to='/login'>Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
