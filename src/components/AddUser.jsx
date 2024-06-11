import React, { useState } from 'react';
import './NavBar.css';

const AddUser = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An error occurred');
                return;
            }

            const data = await response.json();
            setMessage(`User added: ${data.login}`);
            setLogin('');
            setPassword('');
        } catch (err) {
            setError('Failed to add user. Please check the server and try again.');
            console.error('Error:', err);
        }
    };

    return (
        <div className="card">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Login:
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add User</button>
            </form>
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}
        </div>
    );
};

export default AddUser;
