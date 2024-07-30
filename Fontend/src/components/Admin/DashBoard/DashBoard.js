import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GetDashBoard } from '~/services/adminService/dashboardService';
import PaidTeam from './PaidTeam';
import UpdateTeam from './UpdateTeam';
import UnSolveRequests from './UnSolveRequests';
import InfoUser from './InfoUser';

function DashBoard() {
    const [data, setData] = useState({
        totalUser: 0,
        totalUpdatedInfo: 0,
        totalUnupdatedInfo: 0,
        totalPaid: 0,
        totalUnpaid: 0,
        totalUnsolvedRequest: 0
    }); // State to store the dashboard data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDashBoard();
                console.log(result);
                if(result.EC !== -1){
                    setData(result.DT); // Save the fetched data to the state
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData()
    }, []);

    //     if (!data) {
    //     return <div>Loading...</div>; // Show a loading state while data is being fetched
        
    // }

    return (
        <div className="main-content" style={{ flex: '1', padding: '20px' }}>
            <h1 className="mt-4 mb-3 display-4 text-center">DASHBOARD</h1>
            <InfoUser totalUser={data.totalUser}/>
            <UpdateTeam totalUpdatedInfo={data.totalUpdatedInfo} totalUnupdatedInfo = {data.totalUnupdatedInfo} />
            <PaidTeam totalPaid={data.totalPaid}  totalUnpaid={data.totalUnpaid} />
            <UnSolveRequests totalUnsolvedRequest={data.totalUnsolvedRequest} />
            
        </div>
    );
}

export default DashBoard;
