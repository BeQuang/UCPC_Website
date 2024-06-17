import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DownloadListUsers, GetDashBoard } from '~/services/adminService/dashboardService';
import PaidTeam from './PaidTeam';
import UpdateTeam from './UpdateTeam';
import UnSolveRequests from './UnSolveRequests';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import SearchUserByEmail from './SearchByEmail';

function DashBoard() {
    const [data, setData] = useState(null); // State to store the dashboard data
    let errordownload = false;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDashBoard();
                console.log(result);
                setData(result.DT); // Save the fetched data to the state
            } catch (err) {
                console.log(err);
            }
        };
        
        // Set timeout 0.5s để call api lấy data
         const timer = setTimeout(fetchData, 500);
        //clear settimeout
        return () => clearTimeout(timer);
    }, []);

    const handleDownloadAllUsers = async () => {
        try {
            const response = await DownloadListUsers(); // Your API call to get the CSV file
            const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'all_users.csv');
        } catch (error) {
            errordownload = true; 
        }
    };
    if (!data) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
        
    }
    if (errordownload){
        return( 
            <>
                <div>
                    Error downloading the file...
                </div>
                <Link to="/admin">
                    <button className="btn btn-primary btn-lg">
                        Return DashBoard
                    </button>
                </Link>
            </>
        )
    }

    return (
        <div className="main-content" style={{ flex: '1', padding: '20px' }}>
            <h1 className="mt-4 display-4 text-center">Dashboard</h1>
            <div className="row">
                <div className="col-sm">
                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title display-4">Total users: {data.totalUser}</h5>
                            <button className="btn btn-primary btn-lg" onClick={handleDownloadAllUsers}>
                                Download All Users
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SearchUserByEmail />
            <UpdateTeam totalUpdatedInfo={data.totalUpdatedInfo} totalUnupdatedInfo = {data.totalUnupdatedInfo} />
            <PaidTeam totalPaid={data.totalPaid}  totalUnpaid={data.totalUnpaid} />
            <UnSolveRequests totalUnsolvedRequest={data.totalUnsolvedRequest} />
            
        </div>
    );
}

export default DashBoard;
