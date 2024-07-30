import React, { useState } from 'react';
const ListMail = (props) => {

    const { listEmail } = props;
    return (
        <div >
            <table className="table table-striped table-hover table-light">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Template Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{email.template_name} - ID: {email.id}</td>
                                    <td>{email.type}</td>
                                    <td>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        listEmail && listEmail.length === 0 &&
                        <tr>
                            <td colSpan="4" className="text-center">No data found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListMail;