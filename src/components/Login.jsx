import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

axios.defaults.baseURL = 'https://back-jcpa.onrender.com'; // Set your server's base URL

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login || !password) {
      setMessage('Please fill in both fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/api/authenticate', { login, password });
      console.log('Server response:', response); // Log the entire response object
      if (response.status === 200) {
        const user = response.data; // Assuming the user data is returned in the response data
        localStorage.setItem('userId', user.userId); // Save the user ID to localStorage
        localStorage.setItem('login', login); // Save the login to localStorage
        console.log('User data saved to localStorage:', user); // Log the entire user data
        console.log('LocalStorage contents:', localStorage);
        setMessage('Authentication successful');
        navigate('/home'); // Navigate to the Home component
      }
    } catch (error) {
      console.error('Error during authentication:', error); // Log the error for debugging
      if (error.response && error.response.status === 401) {
        setMessage('Invalid login or password');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Login:</label>
          <input type="text" value={login} onChange={handleLoginChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" disabled={loading}>Login</button>
        {message && <p className="message">{message}</p>}
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default Login;
