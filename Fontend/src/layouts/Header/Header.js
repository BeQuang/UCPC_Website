import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('logo')}>
        <a href="#">UCPC</a>
      </div>
      <div className={cx('arrow-line')}></div>
      <nav className={cx('nav-links')}>
        <a href="#">Tin tức</a>
        <a href="#">Thể lệ</a>
        <a href="#">Giải thưởng</a>
        <a href="#">Liên hệ</a>
      </nav>
      <div className={cx('auth-buttons')}>
        <button className={cx('register-btn')}>Đăng ký</button>
        <button className={cx('login-btn')}>Đăng nhập</button>
      </div>
    </header>
  );
}

export default Header;
