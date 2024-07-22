import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DownloadListUsers } from '~/services/adminService/dashboardService';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import SearchUserByEmail from './SearchByEmail';

function InfoUser({totalUser}){
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
            <SearchUserByEmail />
        </div>
    )
}

export default InfoUser;