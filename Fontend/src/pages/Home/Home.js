import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div>
      <header className={cx('header')}>
        Header content
      </header>
      <body className={cx('body')}>
        <div className={cx('rectangle')}>
          <div className={('content')}>
            <div className={cx('title')}>
              <h1>UIT COLLEGIATE</h1>
              <h2>PROGRAMMING CONTEST</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus varius quam in tincidunt. Vestibulum a ultricies risus. Aenean auctor sodales dolor non posuere. Vestibulum nec nulla posuere, sollicitudin ligula.</p>
            </div>
            <button className={cx('botton')}>Đăng ký tham gia</button>
          </div>
        </div>
      </body>
      <footer className={cx('footer')}>
      </footer>
    </div>
  );
}

export default Home;
