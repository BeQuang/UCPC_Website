import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    return <h2 className={cx('wrapper')}>
        {/*Header line with logo*/}
        <div className = {cx('top')}>
            <img src = 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/346619759_548498594143332_8876881902320368395_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEqeUtYxfxt5C9mA7rdAa_Wwdp9UdzWE6fB2n1R3NYTp8wm_jur-Lev0UPjLOTtEG2NbRwT__c44fHi3djVhgaP&_nc_ohc=lKxRbxoesNEQ7kNvgFAYJds&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfAjb8SnBM2L8k7RcteN05aTr9jQNQ8XONH5YgkhHWy7mA&oe=6632871E'
            width={45}
            alt = 'error'
            />
        </div>

        <div className = {cx('top_icon')}></div>
        <div className = {cx('left_icon')}>
            <div className = {cx('l1')}></div>
            <div className = {cx('l2')}></div>
            <div className = {cx('l3')}></div>
            <div className = {cx('l4')}></div>
            <div className = {cx('l5')}></div>
            <div className = {cx('l6')}></div>
        </div>
        <div className = {cx('right_icon')}>
            <div className = {cx('r1')}></div>
            <div className = {cx('r2')}></div>
            <div className = {cx('r3')}></div>
            <div className = {cx('r4')}></div>
            <div className = {cx('r5')}></div>
            <div className = {cx('r6')}></div>
        </div>

        {/* Register area */}
        <form className = {cx('register_form')}>
            <h1>ĐĂNG KÝ</h1>
            <div className = {cx('GG_sign_in')}>
                <img src = 'https://i.pinimg.com/736x/74/65/f3/7465f30319191e2729668875e7a557f2.jpg'
                width={20}
                alt = 'error'
                />
                <button className = {cx('GG_sign_in_button')}>Đăng ký với Google</button>
            </div>

            <div className = {cx('register_infor')}>
                <div className = {cx('register_username')}>
                    <input type = "text" name = "username" size = "30" placeholder = "Tên đăng nhập" required />
                </div>
                <div className = {cx('register_pass')}>
                    <input type = "password" name = "pass" size = "30" placeholder = "Nhập mật khẩu" required />
                    {/* <input type = "checkbox" name = "show_pass_icon" id = 'showPassCheckbox' className = {cx('checkbox')} />
                    <label for = "showPassCheckbox" className = {cx('icon')}><span></span></label> */}

                    <input type = "password" name = "pass" size = "30" placeholder = "Nhập mật khẩu" required />
                    {/* <input type = "checkbox" name = "show_pass_icon" id = 'showPassCheckbox' className = {cx('checkbox')} />
                    <label for = "showPassCheckbox" className = {cx('icon')}><span></span></label> */}

                </div>
            </div>
            <button type = "submit" className = {cx('register_button')}>Đăng ký</button>
        </form>

    </h2>;
}

export default Register;