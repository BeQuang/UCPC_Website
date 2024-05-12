import classNames from 'classnames/bind';
import styles from './News.module.scss';

const cx = classNames.bind(styles);

function News() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <p>TIN TỨC</p>
                </div>
                <div className={cx('line')}></div>
                <div className={cx('title')}>
                    <p>UCPC</p>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('marjor-news')}>
                    <div className={cx('wrapper')}>
                        <a href="/" className={cx('title')}>
                            Massa tortor nibh nulla condimentum imperdiet scelerisque...
                        </a>
                        <p className={cx('time')}>2 Hours Ago</p>
                    </div>
                </div>
                <div className={cx('related-news')}>
                    <div className={cx('news')}>
                        <div className={cx('wrapper')}>
                            <a href="/" className={cx('title')}>
                                News Title Lorem Ipsum Dolor Sit Amet
                            </a>
                            <p className={cx('time')}>1 Hour Ago</p>
                        </div>
                        <div className={cx('img')}></div>
                    </div>
                    <div className={cx('news')}>
                        <div className={cx('wrapper')}>
                            <a href="/" className={cx('title')}>
                                News Title Lorem Ipsum Dolor Sit Amet
                            </a>
                            <p className={cx('time')}>1 Hour Ago</p>
                        </div>
                        <div className={cx('img')}></div>
                    </div>
                    <div className={cx('news')}>
                        <div className={cx('wrapper')}>
                            <a href="/" className={cx('title')}>
                                News Title Lorem Ipsum Dolor Sit Amet
                            </a>
                            <p className={cx('time')}>1 Hour Ago</p>
                        </div>
                        <div className={cx('img')}></div>
                    </div>
                    <button className={cx('btn-see-also')}>Xem thêm</button>
                </div>
            </div>
            <div className={cx('line-bottom')}></div>
        </div>
    );
}

export default News;
