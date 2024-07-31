/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Register from '~/components/Popup/Register';
import Login from '~/components/Popup/Login';
import Dropdown from 'react-bootstrap/Dropdown';
import avt from '~/assets/image/Description_Intro.jpg';
import './Header.scss';
import { doLogout } from '~/redux/actions/userAction';

function Header() {
    const [backToTopButton, setBackToTopButton] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    console.log('account >>>>>>', account, 'isAuthenticated >>>>', isAuthenticated);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Xét trạng thái cho nút đăng ký
    const handleRegister = () => {
        setOpenRegister(true);
    };
    const onCloseRegister = () => {
        setOpenRegister(false);
    };

    const handleLogin = () => {
        setOpenLogin(true);
    };
    const onCloseLogin = () => {
        setOpenLogin(false);
    };

    // Xét trạng thái cho nút đăng xuất
    const handleLogout = () => {
        dispatch(doLogout());
    };

    return (
        <header className={'header'}>
            {backToTopButton && (
                <Link to="video-intro-section" className={'back-text'} smooth={true} duration={500} offset={-70}>
                    <FontAwesomeIcon icon={faArrowUp} className={'back-icon'} />
                </Link>
            )}
            <div className={'logo'}>
                <Link to="video-intro-section" smooth={true} duration={500} offset={-70}>
                    UCPC
                </Link>
            </div>
            <div className={'arrow-line'}></div>
            <nav className={'nav-links'}>
                <Link to="news-section" smooth={true} duration={500}>
                    Tin tức
                </Link>
                <Link to="rules-section" smooth={true} duration={500}>
                    Thể lệ
                </Link>
                <Link to="registration-section" smooth={true} duration={500} offset={-70}>
                    Giải thưởng
                </Link>
                <Link to="homefooter-section" smooth={true} duration={500}>
                    Liên hệ
                </Link>
            </nav>
            <div className={'auth-buttons'}>
                {isAuthenticated ? (
                    <>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic" className={'avatar-toggle'}>
                                <img src={avt} className={'avatar-image'} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    <img src={avt} className={'avatar-image'} />
                                    {account.username}
                                </Dropdown.Item>
                                <Dropdown.Item href="/user">Thông tin đội</Dropdown.Item>
                                <Dropdown.Item>Đóng lệ phí</Dropdown.Item>
                                <Dropdown.Item href="/" onClick={handleLogout}>
                                    Đăng xuất
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <button className={'register-btn'} onClick={handleRegister}>
                            Đăng ký
                        </button>
                        <button className={'login-btn'} onClick={() => handleLogin()}>
                            Đăng nhập
                        </button>
                    </>
                )}
            </div>
            <Popup open={openRegister} onClose={() => setOpenRegister(false)}>
                <Register close={onCloseRegister} />
            </Popup>
            <Popup open={openLogin} onClose={() => setOpenLogin(false)}>
                <Login close={onCloseLogin} />
            </Popup>
        </header>
    );
}

export default Header;
