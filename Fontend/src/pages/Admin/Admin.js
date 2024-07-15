import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import SideBarAdmin from '~/layouts/SideBar/SideBar'; // Đường dẫn đến component sidebar
import DashBoard from '~/components/Admin/DashBoard/DashBoard'; // Đường dẫn đến component dashboard
import UserManage from '~/components/Admin/User.js/User';

function Admin() {
    return (
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <SideBarAdmin />

            <div style={{ flex: 1, marginLeft: '200px' }}>
                <Routes>
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/manage-users" element={<UserManage />} />
                    {/* Thêm các Route khác nếu cần */}
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
