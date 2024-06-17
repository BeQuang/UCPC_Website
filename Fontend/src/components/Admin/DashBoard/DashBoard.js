import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetDashBoard } from '~/services/adminService/dashboardService';
import PaidTeam from './PaidTeam';
import UpdateTeam from './UpdateTeam';
import UnSolveRequests from './UnSolveRequests';

function DashBoard() {
 // State để lưu trữ danh sách teams
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetDashBoard();
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleDownLoadAllUsers = () => {
        // Xử lý sự kiện tải xuống tất cả người dùng
    };

    return (
        <div className="main-content" style={{ flex: '1', padding: '20px' }}>
            <h1 className="mt-4 display-4 text-center">Dashboard</h1>
            <div className="row">
                <div className="col-sm">
                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title display-4">Total users: 1</h5>
                            <button className="btn btn-primary btn-lg" onClick={handleDownLoadAllUsers}>
                                Download All Users
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateTeam/>
            <PaidTeam/>
            <UnSolveRequests/>
            
        </div>
    );
}

export default DashBoard;
