import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoMdHelpCircle, IoMdMail } from 'react-icons/io';
import { AiFillDashboard } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function SideBarAdmin() {
    const iconStyle = { 
        marginRight: '14px',
        marginLeft: '10px'
    };

    const handleLogout = () => {
        // Implement your logout logic here
        alert('Logout')
    };

    return (
        <Sidebar width='180px' style={{ position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ccffff', color: '#333', boxSizing: 'border-box'}}>
            <Menu>
                <MenuItem  component={<Link to="/dashboard"/>}>
                    <AiFillDashboard style={iconStyle} /> Dashboard
                </MenuItem>
                <SubMenu icon={<FaUserAlt/>} label="Users">
                    <MenuItem component={<Link to="/manage-users/1"/>}>Pie charts</MenuItem>
                    <MenuItem  component={<Link to="/manage-users/2"/>}>Line charts</MenuItem>
                    <MenuItem  component={<Link to="/manage-users/3"/>}>Bar charts</MenuItem>
                </SubMenu>
                <SubMenu icon={<IoMdMail/>} label="Mailing">
                    <MenuItem  component={<Link to="/mailing/google-maps"/>}>Google maps</MenuItem>
                    <MenuItem  component={<Link to="/mailing/open-street-maps"/>}>Open street maps</MenuItem>
                </SubMenu>
                <SubMenu icon={<IoMdHelpCircle/>} label="Helps">
                    <MenuItem  component={<Link to="/helps/dark"/>}>Dark</MenuItem>
                    <MenuItem  component={<Link to="/helps/light"/>}>Light</MenuItem>
                </SubMenu>
            </Menu>
            <Menu iconShape="square" style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                <MenuItem onClick={handleLogout} icon={<FaSignOutAlt/>}>
                    Logout
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SideBarAdmin;
