import classNames from 'classnames/bind';
import styles from './Rules.module.scss';

const cx = classNames.bind(styles);

function Rules() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>Thể lệ cuộc thi</h2>
                <div className={cx('type-list')}>
                    <div className={cx('type-item')}>
                        <p>Đối tượng</p>
                    </div>
                    <div className={cx('type-item')}>
                        <p>Hình thức Đăng ký</p>
                    </div>
                    <div className={cx('type-item')}>
                        <p>Quy định</p>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('title')}>
                    <p>Đối tượng</p>
                </div>
                <div className={cx('line')}></div>
                <div className={cx('description')}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Rules;
