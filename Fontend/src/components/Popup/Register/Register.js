import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import logoGoogle from '~/assets/image/Logo_Google.jpg';

const cx = classNames.bind(styles);

function Register() {
    return (
        <h2 className={cx('wrapper')}>
            <form className={cx('register_form')}>
                <h1>ĐĂNG KÝ</h1>
                <div className={cx('GG_sign_in')}>
                    <img src={logoGoogle} width={20} alt="error" />
                    <button className={cx('GG_sign_in_button')}>Đăng ký với Google</button>
                </div>

                <div className={cx('register_infor')}>
                    <div className={cx('register_username')}>
                        <input type="text" name="username" size="30" placeholder="Tên đăng nhập" required />
                    </div>
                    <div className={cx('register_pass')}>
                        <input type="password" name="pass" size="30" placeholder="Nhập mật khẩu" required />

                        <input type="password" name="pass" size="30" placeholder="Xác nhận mật khẩu" required />
                    </div>
                </div>
                <button type="submit" className={cx('register_button')}>
                    <span>Đăng ký</span>
                </button>
            </form>
        </h2>
    );
}

export default Register;
