import React from 'react';
import styles from './AvatarMenuPopup.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AvatarMenuPopup() {
  return (
    <div className={cx('menu-popup')}>
      <ul className={cx('menu-list')}>
        <li className={cx('menu-item')}>Profile</li>
        <li className={cx('menu-item')}>Settings</li>
        <li className={cx('menu-item')}>Logout</li>
      </ul>
    </div>
  );
}

export default AvatarMenuPopup;
