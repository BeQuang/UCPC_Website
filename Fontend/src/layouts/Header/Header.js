import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (
    <header className={cx('header')}>
      {backToTopButton && (
        <Link to='video-intro-section' className={cx('back-text')} smooth={true} duration={500} offset={-70}><FontAwesomeIcon icon={faArrowUp} className={cx('back-icon')} /></Link>)
      }
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
        <button className={cx('register-btn')}>Đăng ký</button>
        <button className={cx('login-btn')}>Đăng nhập</button>
      </div>
    </header>
  );
}

export default Header;
