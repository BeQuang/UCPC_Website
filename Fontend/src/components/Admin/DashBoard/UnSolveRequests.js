import React, { useState } from "react";
import { GetUnsolvedRequest } from "~/services/adminService/dashboardService";

function UnSolveRequests({totalUnsolvedRequest}) {
    const [requests, setRequests] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const handleGetUnSolveRequests = async (event) => {
        event.preventDefault();
            try {
                const response = await GetUnsolvedRequest();
                if (response.EC === 0) {
                    setRequests(response.DT);
                    setMessage(response.EM);
                } else {
                    setMessage(response.EM);
                }
                setShow(true)
            } catch (error) {
                setMessage("An error occurred while fetching the data.");
            }
    };
    const handleHideUnSolveRequests = (event) => {
        event.preventDefault();
        setRequests([]);
        setMessage("")
        setShow(false);
    }

    return (
        <div className="row">
            <div className="col-sm">
                <div className="card mt-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h5 className="card-title display-4">Total unsolved requests: {totalUnsolvedRequest}</h5>
                        {show && (
                            <button className="btn btn-primary btn-lg" onClick={handleHideUnSolveRequests}>
                            Hide
                            </button>
                        )}
                        <button className="btn btn-primary btn-lg" onClick={handleGetUnSolveRequests}>
                            Get all
                        </button>
                    </div>
                </div>

                {show && requests.length === 0 && (
                <div className="row mt-4">
                    <div className="col-sm">
                        <div className="alert alert-info">{message}</div>
                    </div>
                </div>
                )}

                {show && requests.length > 0 && (
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Data</th>
                                    <th>Team Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.title}</td>
                                        <td>{request.data}</td>
                                        <td>{request.teamName || "Not specified"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UnSolveRequests;
