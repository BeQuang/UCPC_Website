import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaGithub } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import './SideBar.scss';

import sidebarBg from '~/assets/image/Logo_UCPC.png';

function SideBar() {
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
                                <span>
                                    RIOT <br /> GAMES
                                </span>
                            </div>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />}>
                            {' '}
                            Dashboard
                            <Link to="/admins" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu icon={<FaGem />} title="Option">
                            <MenuItem>
                                Option 1<Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem>
                                Option 2 <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>
                                Option 3 <Link to="/admins/manage-questions" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.leagueoflegends.com/vi-vn/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                Riot games
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default SideBar;
