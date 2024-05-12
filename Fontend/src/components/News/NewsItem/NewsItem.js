import classNames from 'classnames/bind';
import styles from './NewsItem.module.scss';

const cx = classNames.bind(styles);

function NewsItem({ link = '/', title, time, img }) {
    return (
        <div className={cx('news')}>
            <div className={cx('wrapper')}>
                <a href={link} className={cx('title')}>
                    {title}
                </a>
                <p className={cx('time')}>{time}</p>
            </div>
            <div className={cx('img')}>
                <img src={img} alt="noImage" />
            </div>
        </div>
    );
}

export default NewsItem;
