import React, { useState } from "react";

function UnSolveRequests() {
    const [show, setShow] = useState(false);
    const [requests, setRequests] = useState([
        {
            "id": 3,
            "title": "You should do it 2",
            "data": "plz do it right now 2",
            "teamName": null
        },
        {
            "id": 2,
            "title": "You should do it 2",
            "data": "plz do it right now 2",
            "teamName": null
        },
        {
            "id": 1,
            "title": "You should do it 2",
            "data": "plz do it right now 2",
            "teamName": null
        }
    ]);

    const handleGetAllUnSolveRequests = () => {
        setShow(!show);
    };

    return (
        <div className="row">
            <div className="col-sm">
                <div className="card mt-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h5 className="card-title display-4">Total unsolved requests: {requests.length}</h5>
                        <button className="btn btn-primary btn-lg" onClick={handleGetAllUnSolveRequests}>
                            Get all unsolved requests
                        </button>
                    </div>
                </div>

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
