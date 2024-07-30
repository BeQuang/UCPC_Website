import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { MdDashboard } from 'react-icons/md';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoMdHelpCircle, IoMdMail } from 'react-icons/io';
import { AiFillDashboard } from 'react-icons/ai';

import sidebarBg from '~/assets/image/Logo_UCPC.png';

function SideBarAdmin() {
    const iconStyle = {
        marginRight: '14px',
        marginLeft: '10px',
    };
    const handleLogout = () => {
        // Implement your logout logic here
        alert('Logout');
    };
    return (
        <>
            <ProSidebar
                width="180px"
                style={{ position: 'fixed', backgroundColor: '#182326', color: '#fff', boxSizing: 'border-box' }}
                className={'sideBar-container'}
            >
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
                            <Link to="/admin" />
                        </MenuItem>
                        <SubMenu icon={<FaUserAlt />} title="Users">
                            <MenuItem style={{ fontSize: '14px' }}>
                                Manage Users <Link to="/admin/manage-users" />
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }}>
                                Confirm Payment <Link to="/admin/manage-users/confirmpayment" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu icon={<IoMdMail />} title="Mailing">
                            <MenuItem style={{ fontSize: '14px' }}>
                                Design email <Link to="/admin/mailing" />
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }}>
                                Open street maps <Link to="/admin/mailing/open-street-maps" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu icon={<IoMdHelpCircle />} title="Helps">
                            <MenuItem style={{ fontSize: '14px' }}>
                                Dark <Link to="/admin/helps/dark" />
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }}>
                                Light <Link to="/admin/helps/light" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <Menu iconShape="square" style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                        <MenuItem onClick={handleLogout} icon={<FaSignOutAlt />}>
                            Logout
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default SideBarAdmin;
