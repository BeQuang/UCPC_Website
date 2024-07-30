import 'bootstrap/dist/css/bootstrap.min.css';
import { DownloadListUsers, searchByEmail } from '~/services/adminService/dashboardService';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function InfoUser({totalUser}){
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    let errordownload = false;
    const handleDownloadAllUsers = async () => {
        try {
            const response = await DownloadListUsers(); // Your API call to get the CSV file
            const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'all_users.csv');
        } catch (error) {
            errordownload = true; 
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await searchByEmail(email);
            if (response.EC === 0) {
                setUsers(response.DT.rows);
                setError('');
            } else {
                setUsers([]);
                setError(response.EM);
            }
        } catch (err) {
            setError('An error occurred while searching for the user.');
            console.log(err)
        }
    };


    if (errordownload){
        return( 
            <>
                <div>
                    Error downloading the file...
                </div>
                <Link to="/admin/dashboard">
                    <button className="btn btn-primary btn-lg">
                        Return DashBoard
                    </button>
                </Link>
            </>
        )
    }
    return(
        <div style={{ border: '2px solid #000', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
            <div className="row">
                <div className="col-sm">
                    <div className="card mb-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title">Total users: {totalUser}</h5>
                            <button className="btn btn-primary btn-lg mx-3" style={{ fontSize: '1rem'}} onClick={handleDownloadAllUsers}>
                                Download All Users
                            </button>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="search-user-by-email">
                <form onSubmit={handleSearch} className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control form-control-lg" // Use form-control-lg for larger input size
                        placeholder="Enter email to search"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ fontSize: '1rem'}}
                    />
                    <button type="submit" className="btn btn-primary ml-2 mx-3 " style={{ fontSize: '1rem'}}>Search</button>
                </form>

                {error && <div className="mt-3 text-danger">{error}</div>}
                {/* {users.length === 0 && 
                    <>
                    Không có user nào
                    </>
                } */}
                {users.length !== 0 && (
                    <div className="user-details">
                        <h5>User Details:</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Team Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>{user.teamName}</td>
                                    </tr>
                                ))  
                            }              
                                
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InfoUser;