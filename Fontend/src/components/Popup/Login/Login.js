import './Login.scss';
import { useState } from 'react';
import { postLogin } from '~/services/authService';
import { useNavigate } from 'react-router-dom';
import { TbMathGreater } from 'react-icons/tb';
import { TbMathLower } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { doLogin } from '~/redux/actions/userAction';

function Login({ close }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const dispatch = useDispatch();

    const validateEmail = (e) => {
        const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        return regex.test(e);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setMailError('');
        } else {
            if (e.target.value.length < 1) {
                setMailError('');
            } else setMailError('Email không hợp lệ');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, pass);
        postLogin(email, pass)
            .then((res) => {
                console.log(res);
                if (res.EC === -1) {
                    setMessage(res.EM);
                } else if (res.EC === 0) {
                    dispatch(doLogin(res));
                    close();
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={'login'}>
            <form className={'login_form'}>
                <h1 className={'title'} id="top">
                    CHÀO MỪNG
                </h1>
                <h2 className="title" id="mid">
                    BẠN ĐẾN VỚI
                </h2>
                <h1 className="title" id="bot">
                    <TbMathGreater className="icon" />
                    UCPC
                    <TbMathLower className="icon" />
                </h1>
                <div className={'login_info'}>
                    <div className={'login_message'}>
                        <span>{message}</span>
                    </div>
                    <div className={'login_email'}>
                        <div className="mess">
                            <span>{mailError}</span>
                        </div>
                        <input type="email" name="email" placeholder="Email" onChange={handleChangeEmail} required />
                    </div>
                    <div className={'login_pass'}>
                        <div className="mess">
                            <span>{passError}</span>
                        </div>
                        <input
                            type="password"
                            name="pass"
                            placeholder="Nhập mật khẩu"
                            minLength={6}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        <br />
                    </div>
                    <div className="button_area">
                        <button type="submit" className={'login_button'} onClick={handleLogin}>
                            <span>Đăng nhập</span>
                        </button>
                        <div className="option">
                            <span className="option" id="option1"></span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
