import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

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

        if (login) {
            fetchUserData();
        } else {
            setError('No login found in localStorage');
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }
 
    
    const balance = Number(user.balance).toFixed(3);
    return (
        <div className='container'>
            <h1> {user.login} <br/>           
            Balance: {balance}</h1>
            
            {/* Add more user details as needed */}
        </div>
    );
};

export default UserComponent;
