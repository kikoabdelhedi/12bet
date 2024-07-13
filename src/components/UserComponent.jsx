import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserComponent.css';
import { useNavigate } from 'react-router-dom';

const UserComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  console.log('user : ' ,user)
  const [error, setError] = useState('');

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    window.location.reload(); // Refresh the page
  };

  useEffect(() => {
    // Get the login from localStorage
    const login = localStorage.getItem('login');

    // Fetch the user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${login}`);
        setUser(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('User not found');
        } else {
          setError('Internal Server Error');
        }
      }
    };

   

    // Fetch user data and set up interval if user is logged in
    if (login) {
      fetchUserData();
      // Set interval to check every hour
   

      // Cleanup interval on component unmount

    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  // Formatting balance to three decimal places
  const balance = Number(user.balance).toFixed(3);

  const One = (eventid) => {
    navigate(`/Home`);
  };

  return (
    <div className="header11">
      <div className="col-12 d-flex">
        <ul className="nav navigation-main align-items-center">
          <li className="nav-item" onClick={One}>
            <img className='im' src='https://res.cloudinary.com/dqmhtibfm/image/upload/c_scale,w_150/v1718367699/Koora-bet-365-removebg-preview_hrygyw.png' alt="Logo" />
          </li>
          <li className="nav-item">
            <span className="nav-link">
              Name {user.login}
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              Balance {balance} TND
            </span>
          </li>
          <li className="nav-item" onClick={handleLogout}>
            <span className="nav-link">
              Logout <br /> ➔
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserComponent;
