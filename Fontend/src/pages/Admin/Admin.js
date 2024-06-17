import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBarAdmin from '~/components/Admin/SideBar'; // Đường dẫn đến component sidebar
import DashBoard from '~/components/Admin/DashBoard/DashBoard'; // Đường dẫn đến component dashboard

function Admin() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <SideBarAdmin />

            <div style={{ flex: 1, padding: '20px', marginLeft: '200px' }}>
                <DashBoard />
            </div>
        </div>
    );
}

export default Admin;
