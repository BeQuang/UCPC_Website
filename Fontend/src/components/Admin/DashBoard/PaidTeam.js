import { useState } from "react";
import { GetUnpaidTeams } from "~/services/adminService/dashboardService";

function PaidTeam () {
    const [show, setShow] = useState(false)
    const [teams, setTeams] = useState([
        // {
        //     "id": 2,
        //     "email": "thanvantran1707@gmail.com",
        //     "username": "vanthan",
        //     "role": "USER",
        //     "teamName": "Not updated yet / admin account"
        // },
        // {
        //     "id": 2,
        //     "email": "thanvantran1707@gmail.com",
        //     "username": "vanthan",
        //     "role": "USER",
        //     "teamName": "Not updated yet / admin account"
        // },
        // {
        //     "id": 2,
        //     "email": "thanvantran1707@gmail.com",
        //     "username": "vanthan",
        //     "role": "USER",
        //     "teamName": "Not updated yet / admin account"
        // },
        // {
        //     "id": 2,
        //     "email": "thanvantran1707@gmail.com",
        //     "username": "vanthan",
        //     "role": "USER",
        //     "teamName": "Not updated yet / admin account"
        // },
        // {
        //     "id": 2,
        //     "email": "thanvantran1707@gmail.com",
        //     "username": "vanthan",
        //     "role": "USER",
        //     "teamName": "Not updated yet / admin account"
        // },
        // {
        //     "id": 2,
        //     "email": "thanvantran1707@gmail.com",
        //     "username": "vanthan",
        //     "role": "USER",
        //     "teamName": "Not updated yet / admin account"
        // }
    ]);
    const handleUnpaidTeams = async () => {
        const response = await GetUnpaidTeams();
        if (response.EC === 0){
            
        }
        setShow(!show)
    }
    return(
        <>
            <div className="row">
                    <div className="col-sm">
                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <h5 className="card-title display-4">Total paid teams: 1</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <h5 className="card-title display-4">Total unpaid teams: 1</h5>
                                <button className="btn btn-primary btn-lg" onClick={handleUnpaidTeams}>
                                    Get all unpaid users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {show && teams.length > 0 && (
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

export default PaidTeam;