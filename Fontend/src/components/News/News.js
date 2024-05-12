import classNames from 'classnames/bind';
import styles from './News.module.scss';
import NewsItem from './NewsItem';

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
                    <NewsItem title={'News Title Lorem Ipsum Dolor Sit Amet'} time={'1 Hour Ago'} />
                    <NewsItem title={'News Title Lorem Ipsum Dolor Sit Amet'} time={'1 Hour Ago'} />
                    <NewsItem title={'News Title Lorem Ipsum Dolor Sit Amet'} time={'1 Hour Ago'} />

                    <button className={cx('btn-see-also')}>Xem thêm</button>
                </div>
            </div>
            <div className={cx('line-bottom')}></div>
        </div>
    );
}

export default News;
