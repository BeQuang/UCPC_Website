import classNames from 'classnames/bind';
import styles from './Rules.module.scss';
import RulesItem from './RulesItem';

const cx = classNames.bind(styles);

function Rules() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>Thể lệ cuộc thi</h2>
                <div className={cx('type-list')}>
                    <div className={cx('type-item', 'active')}>
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
                <RulesItem
                    title={'Đối tượng'}
                    description={
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquipex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eufugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officiadeserunt mollit anim id est laborum.'
                    }
                />
            </div>
        </div>
    );
}

export default Rules;
