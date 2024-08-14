import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/userSlice';

import Home from './pages/Home';
import Login from './pages/Login';
import HomeLayout from './pages/HomeLayout';
import Request from './pages/Request';
import Show_tickets from './pages/Show_tickets';
import About from './pages/About';
import Register from './pages/Register';
import Booking from './pages/Booking';
import My_bookings from './pages/My_bookings';
import Welcomepage from './pages/Welcomepage';
import ProtectedRoute from './components/ProtectedRoute';
import Today_Bookings from './pages/Today_Bookings';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      dispatch(setToken({ token, role }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/request' element={<Request />} />
          <Route path='/register' element={<Register />} />
          

          <Route element={<ProtectedRoute roles={['Student']} restrictedPath='/welcome' />}>
            <Route path='/tickets' element={<Show_tickets />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/my-bookings' element={<My_bookings />} />
          </Route>
          
          <Route element={<ProtectedRoute roles={['Incharge']} />}>
            <Route path='/welcome' element={<Welcomepage />} />
            <Route path='/today-bookings' element={<Today_Bookings />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
