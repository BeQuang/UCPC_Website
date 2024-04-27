import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    return <h2 className={cx('wrapper')}>

            <h1>ĐĂNG KÍ</h1>
            <form id = "register_form">
                <div className = {cx('register_username')}>
                    <input type = "text" name = "username" size = "30" placeholder = "Tên đăng nhập" required />
                </div>
                
                <div className = {cx('register_pass')}>
                    <input type = "password" name = "pass" size = "30" placeholder = "Nhập mật khẩu" required />
                    <input type = "checkbox" name = "show_pass_icon" className = {cx('showPassCheckbox')} />
                    <br/>
                    <input type = "password" name = "pass" size = "30" placeholder = "Nhập mật khẩu" required />
                    <input type = "checkbox" name = "show_pass_icon"  className = {cx('showPassCheckbox')} />
                </div>
            <button type = "submit" className = {cx('register_button')}>Đăng kí</button>
            </form>

    </h2>;
}

export default Register;