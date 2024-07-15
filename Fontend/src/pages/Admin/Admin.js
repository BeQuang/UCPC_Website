import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import SideBarAdmin from '~/components/Admin/SideBar'; // Đường dẫn đến component sidebar
import DashBoard from '~/components/Admin/DashBoard/DashBoard'; // Đường dẫn đến component dashboard
import UserManage from '~/components/Admin/User.js/User';

function Admin() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <SideBarAdmin />

            <div style={{ flex: 1, marginLeft: '200px' }}>
                <Routes>
                    <Route path="/admin/dashboard" element={<DashBoard />} />
                    <Route path="/admin/user-manage" element={<UserManage />} />
                    {/* Thêm các Route khác nếu cần */}
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
