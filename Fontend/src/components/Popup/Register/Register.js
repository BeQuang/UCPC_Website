import './Register.scss';
import logoGoogle from '~/assets/image/Logo_Google.jpg';

function Register() {
    return (
        <h2 className={'register'}>
            <form className={'register_form'}>
                <h1 className={'title'}>ĐĂNG KÝ</h1>
                <div className={'GG_sign_in'}>
                    <img src={logoGoogle} width={20} alt="error" />
                    <button className={'btn-sign-in'}>Đăng ký với Google</button>
                </div>

                <div className={'register_info'}>
                    <div className={'register_username'}>
                        <input type="text" name="username" size="30" placeholder="Tên đăng nhập" required />
                    </div>
                    <div className={'register_pass'}>
                        <input type="password" name="pass" size="30" placeholder="Nhập mật khẩu" required />

                        <input type="password" name="pass" size="30" placeholder="Xác nhận mật khẩu" required />
                    </div>
                </div>
                <button type="submit" className={'register_button'}>
                    <span>Đăng ký</span>
                </button>
            </form>
        </h2>
    );
}

export default Register;
