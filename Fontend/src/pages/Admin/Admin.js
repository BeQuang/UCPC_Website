import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './Admin.scss';
import SideBar from '~/layouts/SideBar';

function Admin() {
    return (
        <div className={'admin'}>
            <SideBar className="sidebar" />
            <div className={'content'}>
                <div className={'header'}>header</div>
                <div className={'main'}>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
