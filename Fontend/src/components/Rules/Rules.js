import classNames from 'classnames/bind';
import styles from './Rules.module.scss';

const cx = classNames.bind(styles);

function Rules() {
    return (
        <div className={cx('page4')}>
            <div className={cx('body1')}>
                <div className={cx('body1__container1')}>
                    <h2 className={cx('body1__container1__content')}>Thể lệ cuộc thi</h2>
                </div>
                <div className={cx('body1__container2')}>
                    <div className={cx('body1__container2__box')}>
                        <div className={cx('body1__container2__box__purplerectangle')}></div>
                        <div
                            className={cx(
                                'body1__container2__box__content',
                                'body1__container2__box__content__fixcenter',
                            )}
                        >
                            <p>Đối tượng</p>
                        </div>
                    </div>
                    <div className={cx('body1__container2__box')}>
                        <div className={cx('body1__container2__box__content')}>
                            <p>Hình thức Đăng ký</p>
                        </div>
                    </div>
                    <div className={cx('body1__container2__box')}>
                        <div className={cx('body1__container2__box__content')}>
                            <p>Quy định</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('body2')}>
                <div className={cx('body2__container')}>
                    <div className={cx('body2__container__title')}>
                        <p>Đối tượng</p>
                    </div>
                    <div className={cx('body2__container__line')}></div>
                    <div className={cx('body2__container__content')}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rules;
