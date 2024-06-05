import './Register.scss';
import logoGoogle from '~/assets/image/Logo_Google.jpg';
import { useState } from 'react';
import { postRegister } from '~/services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const [rePassError, setRePassError] = useState('');

    const validateEmail = (e) => {
        const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        return regex.test(e);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setMailError('');
        }
        else {
            if (e.target.value.length < 1)
                {setMailError('');}
            else setMailError('Email không hợp lệ');
        }  
    }
    const validatePassword = (e) => {
        const regex = new RegExp('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|([a-z][A-Z][0-9][!@#$%^&*()])');
        return regex.test(e);
    }
    const handleChangePass = (e) => {
        setPass(e.target.value);
        if (validatePassword(e.target.value)) {
            setPassError('');
        }
        else {
            if (e.target.value.length < 1)
                {setPassError('');}
            else setPassError('Mật khẩu có ít nhất 6 ký tự và phải bao gồm các ký tự A-Z, a-z, 0-9');
        }
    }
    const handleChangeRePass = (e) => {
        setRePass(e.target.value);
        if (pass === e.target.value) {
            setRePassError('');
        }
        else {
            if (e.target.value.length < 1)
                {setRePassError('');}
            else setRePassError('Mật khẩu không khớp');
        }
    }
    const handelRegister = (e) => {
        e.preventDefault();
        if (pass === rePass) {
            console.log(username, email, pass);
            postRegister(email, pass, username).then((res) => {
                console.log(res);
                if (res.EC === -1) {
                    setMessage(res.EM);
                }
                else if (res.EC === 0) {
                    navigate('/');
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log(username, email);
            console.log("pass: ", pass, "repass: ", rePass);
            setRePassError('Mật khẩu không khớp');
        }
    }

    return (
        <h2 className={'register'}>
            <form className={'register_form'}>
                <h1 className={'title'}>ĐĂNG KÝ</h1>
                <div className={'register_info'}>
                    <div className={'register_message'}>
                        <span>{message}</span>
                    </div>
                    <div className={'register_email'}>
                        <div className='mess'>
                        <span>{mailError}</span>
                        </div>
                        <input type="email" name="email" placeholder="Email" onChange={handleChangeEmail} required />
                    </div>
                    <div className={'register_username'}>
                        <input type="text" name="username" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className={'register_pass'}>
                        <div className='mess'>
                        <span>{passError}</span>
                        </div>
                        <input type="password" name="pass" placeholder="Nhập mật khẩu" minLength={6} onChange={handleChangePass} required /><br/>
                        <div className='mess'>
                        <span>{rePassError}</span>
                        </div>
                        <input type="password" name="repass" placeholder="Xác nhận mật khẩu" minLength={6} onChange={handleChangeRePass} required />
                    </div>
                </div>
                <button type="submit" className={'register_button'} onClick={handelRegister}>
                    <span>Đăng ký</span>
                </button>
            </form>
        </h2>
    );
}

export default Register;
