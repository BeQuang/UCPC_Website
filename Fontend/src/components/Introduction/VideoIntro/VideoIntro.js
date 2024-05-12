import classNames from 'classnames/bind';
import styles from './VideoIntro.module.scss';

const cx = classNames.bind(styles);

function VideoIntro() {
    return (
        <div>
            <header className={cx('header')}>Header content</header>
            <div className={cx('body')}>
                <div className={cx('bg-img')}>
                    <div className={cx('overlay')}>
                        <div className={cx('title')}>
                            <h1>UIT COLLEGIATE</h1>
                            <h2>PROGRAMMING CONTEST</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus varius quam in
                                tincidunt. Vestibulum a ultricies risus. Aenean auctor sodales dolor non posuere.
                                Vestibulum nec nulla posuere, sollicitudin ligula.
                            </p>
                            <button className={cx('button')}>Đăng ký tham gia</button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={cx('footer')}></footer>
        </div>
    );
}

export default VideoIntro;
