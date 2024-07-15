import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Register from '~/components/Popup/Register';
import Dropdown from 'react-bootstrap/Dropdown';
import avt from '~/assets/image/Description_Intro.jpg'

const cx = classNames.bind(styles);

function Header() {
  const [backToTopButton, setBackToTopButton] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xét trạng thái cho nút đăng ký
  const handleRegister = () => {
    setOpenRegister(true);
  };

  // Xét trạng thái cho nút đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <header className={cx('header')}>
      {backToTopButton && (
        <Link to='video-intro-section' className={cx('back-text')} smooth={true} duration={500} offset={-70}>
          <FontAwesomeIcon icon={faArrowUp} className={cx('back-icon')} />
        </Link>
      )}
      <div className={cx('logo')}>
        <Link to='video-intro-section' smooth={true} duration={500} offset={-70}>UCPC</Link>
      </div>
      <div className={cx('arrow-line')}></div>
      <nav className={cx('nav-links')}>
        <Link to='news-section' smooth={true} duration={500}>Tin tức</Link>
        <Link to='rules-section' smooth={true} duration={500}>Thể lệ</Link>
        <Link to='registration-section' smooth={true} duration={500} offset={-70}>Giải thưởng</Link>
        <Link to='homefooter-section' smooth={true} duration={500}>Liên hệ</Link>
      </nav>
      <div className={cx('auth-buttons')}>
        {isLoggedIn ? (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic" className={cx('avatar-toggle')}>
                <img
                  src={avt}
                  className={cx('avatar-image')}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <img
                    src={avt}
                    className={cx('avatar-image')}
                  />
                  Tên
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="/" onClick={handleLogout}>Đăng xuất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <button className={cx('register-btn')} onClick={handleRegister}>Đăng ký</button>
            <button className={cx('login-btn')}>Đăng nhập</button>
          </>
        )}
      </div>
      <Popup
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      >
        <Register />
      </Popup>
    </header>
  );
}

export default Header;
