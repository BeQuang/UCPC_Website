import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import SideBar from '~/layouts/SideBar';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('admin')}>
            <SideBar />

            <div className={cx('content')}>
                <div className={cx('header')}>header</div>
                <div className={cx('main')}>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
