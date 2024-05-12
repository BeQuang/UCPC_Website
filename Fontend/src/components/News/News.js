import classNames from 'classnames/bind';
import styles from './News.module.scss';

const cx = classNames.bind(styles);

function News() {
    return (
        <div className={cx('page3')}>
            <div className={cx('body1')}>
                <div className={cx('body1__content')}>
                    <p>TIN TỨC</p>
                </div>
                <div className={cx('body1__line')}></div>
                <div className={cx('body1__content')}>
                    <p>UCPC</p>
                </div>
            </div>
            <div className={cx('body2')}>
                <div className={cx('body2__box1')}>
                    <div className={cx('body2__box1__container')}>
                        <a href="/" className={cx('body2__box1__container__title')}>
                            Massa tortor nibh nulla condimentum imperdiet scelerisque...
                        </a>
                        <p className={cx('body2__box1__container__time')}>2 Hours Ago</p>
                    </div>
                </div>
                <div className={cx('body2__box2')}>
                    <div className={cx('body2__box2__content')}>
                        <div className={cx('body2__box2__content__container')}>
                            <a href="/" className={cx('body2__box2__content__container__title')}>
                                News Title Lorem Ipsum Dolor Sit Amet
                            </a>
                            <p className={cx('body2__box2__content__container__time')}>1 Hour Ago</p>
                        </div>
                        <div className={cx('body2__box2__content__img')}></div>
                    </div>
                    <div className={cx('body2__box2__content')}>
                        <div className={cx('body2__box2__content__container')}>
                            <a href="/" className={cx('body2__box2__content__container__title')}>
                                News Title Lorem Ipsum Dolor Sit Amet
                            </a>
                            <p className={cx('body2__box2__content__container__time')}>1 Hour Ago</p>
                        </div>
                        <div className={cx('body2__box2__content__img')}></div>
                    </div>
                    <div className={cx('body2__box2__content')}>
                        <div className={cx('body2__box2__content__container')}>
                            <a href="/" className={cx('body2__box2__content__container__title')}>
                                News Title Lorem Ipsum Dolor Sit Amet
                            </a>
                            <p className={cx('body2__box2__content__container__time')}>1 Hour Ago</p>
                        </div>
                        <div className={cx('body2__box2__content__img')}></div>
                    </div>
                    <div className={cx('body2__box2__footer')}>
                        <button className={cx('body2__box2__footer__botton')}>Xem thêm</button>
                    </div>
                </div>
            </div>
            <div className={cx('body3')}>
                <div className={cx('body3__line')}></div>
            </div>
        </div>
    );
}

export default News;
