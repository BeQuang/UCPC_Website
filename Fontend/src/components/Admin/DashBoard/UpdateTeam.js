import { useState } from "react";
import { GetHasNotUpdateTeam } from "~/services/adminService/dashboardService";

function UpdateTeam ({totalUpdatedInfo, totalUnupdatedInfo}) {
    const [teams, setTeams] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const handleGetHasNotUpdateTeams = async (event) => {
        event.preventDefault();
            try {
                const response = await GetHasNotUpdateTeam();
                if (response.EC === 0) {
                    setTeams(response.DT);
                    setMessage(response.EM)
                } else {
                    setMessage(response.EM);
                }
                setShow(true)
            } catch (error) {
                setMessage("An error occurred while fetching the data.");
            }
    };

    const handleHideHasNotUpdateTeams = (event) => {
        event.preventDefault();
        setTeams([]);
        setMessage("")
        setShow(false);
    }

    return(
        <>
            <div className="row">
                <div className="col-sm">
                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title display-4">Total users have updated information: {totalUpdatedInfo}</h5>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="row">
                <div className="col-sm">
                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title display-4">Total users have unupdated information: {totalUnupdatedInfo}</h5>
                            {show && (
                                <button className="btn btn-primary btn-lg" onClick={handleHideHasNotUpdateTeams}>
                                Hide
                            </button>
                            )}
                            <button className="btn btn-primary btn-lg" onClick={handleGetHasNotUpdateTeams}>
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
                <div className="mt-4">
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
            )}
        </>
    )
}

export default UpdateTeam;