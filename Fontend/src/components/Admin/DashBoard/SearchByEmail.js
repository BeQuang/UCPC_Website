import React, { useState } from 'react';
import { searchByEmail } from '~/services/adminService/dashboardService';

function SearchUserByEmail() {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await searchByEmail(email);
            if (response.EC === 0) {
                setUser(response.DT.rows);
                setError('');
            } else {
                setUser([]);
                setError(response.EM);
            }
        } catch (err) {
            setError('An error occurred while searching for the user.');
        }
    };

    return (
        <div className="search-user-by-email">
            <form onSubmit={handleSearch} className="d-flex align-items-center">
                <input
                    type="email"
                    className="form-control form-control-lg" // Use form-control-lg for larger input size
                    placeholder="Enter email to search"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary ml-2">Search</button>
            </form>

            {error && <div className="mt-3 text-danger">{error}</div>}

            {user.length !== 0 && (
                <div className="mt-3">
                    <h5>User Details:</h5>
                    <p>ID: {user[0].id}</p>
                    <p>Email: {user[0].email}</p>
                    <p>Username: {user[0].username}</p>
                    <p>Role: {user[0].role}</p>
                    <p>Team Name: {user[0].teamName}</p>
                </div>
            )}
        </div>
    );
}

export default SearchUserByEmail;
