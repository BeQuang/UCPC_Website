import React, { useState } from 'react';
import { GetUnpaidTeams } from '~/services/adminService/dashboardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaidTeam({ totalPaid, totalUnpaid }) {
    const [teams, setTeams] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const handleGetUnpaidTeams = async (event) => {
        event.preventDefault();
            try {
                const response = await GetUnpaidTeams();
                if (response.EC === 0) {
                    setTeams(response.DT);
                    setMessage(response.EM);
                } else {
                    setMessage(response.EM);
                }
                setShow(true)
            } catch (error) {
                setMessage("An error occurred while fetching the data.");
            }
    };
    const handleHideUnpaidTeams = (event) => {
        event.preventDefault();
        setTeams([]);
        setMessage("")
        setShow(false);
    }

    return (
        <>
            <div className="row">
                <div className="col-sm">
                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title display-4">Total paid teams: {totalPaid}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title display-4">Total unpaid teams: {totalUnpaid}</h5>
                            {show &&  (
                                <button className="btn btn-primary btn-lg" onClick={handleHideUnpaidTeams}>
                                    Hide
                                </button>
                            )}
                            <button className="btn btn-primary btn-lg" onClick={handleGetUnpaidTeams}>
                                Get all
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {show && teams.length === 0 && (
                <div className="row mt-4">
                    <div className="col-sm">
                        <div className="alert alert-info">{message}</div>
                    </div>
                </div>
            )}

            {teams.length > 0 && (
                <div className="row mt-4">
                    <div className="col-sm">
                        <table className="table table-striped">
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
                                {teams.map(team => (
                                    <tr key={team.id}>
                                        <td>{team.id}</td>
                                        <td>{team.email}</td>
                                        <td>{team.username}</td>
                                        <td>{team.role}</td>
                                        <td>{team.teamName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default PaidTeam;
