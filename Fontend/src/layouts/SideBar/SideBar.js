import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { MdDashboard } from 'react-icons/md';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoMdHelpCircle, IoMdMail } from 'react-icons/io';
import { AiFillDashboard } from 'react-icons/ai';

import sidebarBg from '~/assets/image/Logo_UCPC.png';

function SideBar() {
    const iconStyle = { 
        marginRight: '14px',
        marginLeft: '10px'
    };
    const handleLogout = () => {
        // Implement your logout logic here
        alert('Logout')
    };
    return (
        <>
            <ProSidebar image={sidebarBg} breakPoint="md" className={'sideBar-container'}>
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div className="logo">
                            <MdDashboard size={'2em'} />
                            <div className="logo-text">
                                <span>UCPC</span>
                            </div>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                <Menu>
                <MenuItem>
                    <AiFillDashboard style={iconStyle} /> Dashboard
                    <Link to="/dashboard"/>
                </MenuItem>
                <SubMenu icon={<FaUserAlt/>} title="Users">
                    <MenuItem>Manage Users <Link to="/manage-users"/></MenuItem>
                    <MenuItem>Confirm Payment <Link to="/manage-users/confirmpayment"/></MenuItem>
                </SubMenu>
                <SubMenu icon={<IoMdMail/>} title="Mailing">
                    <MenuItem>Google maps <Link to="/mailing/google-maps"/></MenuItem>
                    <MenuItem>Open street maps <Link to="/mailing/open-street-maps"/></MenuItem>
                </SubMenu>
                <SubMenu icon={<IoMdHelpCircle/>} title="Helps">
                    <MenuItem>Dark <Link to="/helps/dark"/></MenuItem>
                    <MenuItem>Light <Link to="/helps/light"/></MenuItem>
                </SubMenu>
            </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                <Menu iconShape="square" style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                <MenuItem onClick={handleLogout} icon={<FaSignOutAlt/>}>
                    Logout
                </MenuItem>
            </Menu>

                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default SideBar;
