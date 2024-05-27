import classNames from 'classnames/bind';
import styles from './VideoIntro.module.scss';
import { postLogin } from '~/services/authService';

const cx = classNames.bind(styles);

function VideoIntro() {
    const handleRegister = async () => {
        const res = await postLogin('abc@gmail.com', '123456');
        console.log('check >>>> ', res);
    };
    return (
        <div>
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
                            <button className={cx('button')} onClick={() => handleRegister()}>
                                Đăng ký tham gia
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={cx('footer')}></footer>
        </div>
    );
}

export default VideoIntro;
