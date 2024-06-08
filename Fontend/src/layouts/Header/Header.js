import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-scroll';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('logo')}>
        <a href="#">UCPC</a>
      </div>
      <div className={cx('arrow-line')}></div>
      <nav className={cx('nav-links')}>
        <Link to='news-section' smooth={true} duration={500}>Tin tức</Link>
        <Link to='rules-section' smooth={true} duration={500}>Thể lệ</Link>
        <Link to='registration-section' smooth={true} duration={500}>Giải thưởng</Link>
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
