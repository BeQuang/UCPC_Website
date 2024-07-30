import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBarAdmin from '~/layouts/SideBar/SideBar'; // Đường dẫn đến component sidebar
import { Outlet } from 'react-router-dom';

function Admin() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <SideBarAdmin />

            <div style={{ flex: 1, marginLeft: '200px' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
