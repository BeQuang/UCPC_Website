import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Popup from '~/components/Popup';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('home')}>
      <div className={cx('page1')}>
        <header className={cx('header')}>
          Header content
        </header>
        <div className={cx('body')}>
          <div className={cx('body__bgimg')}>
            <div className={cx('body__overlay')}>
              <div className={cx('body__title')}>
                <h1>UIT COLLEGIATE</h1>
                <h2>PROGRAMMING CONTEST</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus varius quam in tincidunt. Vestibulum a ultricies risus. Aenean auctor sodales dolor non posuere. Vestibulum nec nulla posuere, sollicitudin ligula.</p>
                <button className={cx('button')}>Đăng ký tham gia</button>
              </div>
            </div>
          </div>
        </div>
        <footer className={cx('footer')}>
        </footer>
      </div>
      <div className={cx('page2')}>
        <div className={cx('body1')}>
          <div className={cx('body1__box')}>
            <div className={cx('body1__box__content')}>
              <p className={cx('body1__box__content__text1')}>Với sự tham gia của</p>
              <p className={cx('body1__box__content__text2')}>XX</p>
              <p>Đơn vị trường học</p>
            </div>
          </div>
          <div className={cx('body1__box', 'body1__box__box2')}>
            <div className={cx('body1__box__content')}>
              <p className={cx('body1__box__content__text1')}>Được tổ chức từ</p>
              <p className={cx('body1__box__content__text2')}>2014</p>
            </div>
          </div>
          <div className={cx('body1__box')}>
            <div className={cx('body1__box__content')}></div>
          </div>
        </div>
        <div className={cx('body2')}>
          <div className={cx('body2__content')}>
            <img src="https://s3-alpha-sig.figma.com/img/2a82/9740/50cac91b6c99f1dd6b818fc2c799e3d5?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CJmnMN~xeNaFztTd-o5LmJDV4Z8rQkVhhLvHO9qoAqfNOc1V7N6DhiGjJYBladto6Z2aSuOEKn3fC1~Pho5rdTidW2Kq6t4M4SoYL3MoMX9lZ7ocLSUJ4qJaOsXe~tGYUTVSGUFMwBR0V0DAP4vhXVwUenP67Ox-13jVE60YaRV0usEJGqUn4CA7Z2Ns0uBEIBmgRtxgvzT1CYQlZDp6yPcGURIbr7PikwhTz21SitAav0eKfQ5ARZgUhiscP7yyUfar8gN47lar3z--MpSmnNpZwZ-4ZdSBet4m7UwmoYUm8~YCfmN6~genc~I3iVBh9lpe-oNxbW-2ASGjLzSyaA__" alt="" className={cx('body2__content__logo')} />
            <h1 className={cx('body2__content__title')}>UCPC 2024</h1>
            <p className={cx('body2__content__content')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
      <div className={cx('page3')}>
        <div className={cx('body1')}>
          <div className={cx('body1__content')}>
            <p>TIN TỨC</p>
          </div>
          <div className={cx('body1__line')}></div>
          <div className={cx('body1__content')}>
            <p>UCPC</p>
          </div>
        </div>
        <div className={cx('body2')}>
          <div className={cx('body2__box1')}>
            <div className={cx('body2__box1__container')}>
              <a href="#" className={cx('body2__box1__container__title')}>Massa tortor nibh nulla condimentum imperdiet scelerisque...</a>
              <p className={cx('body2__box1__container__time')}>2 Hours Ago</p>
            </div>
          </div>
          <div className={cx('body2__box2')}>
            <div className={cx('body2__box2__content')}>
              <div className={cx('body2__box2__content__container')}>
                <a href="#" className={cx('body2__box2__content__container__title')}>News Title Lorem Ipsum Dolor Sit Amet</a>
                <p className={cx('body2__box2__content__container__time')}>1 Hour Ago</p>
              </div>
              <div className={cx('body2__box2__content__img')}></div>
            </div>
            <div className={cx('body2__box2__content')}>
              <div className={cx('body2__box2__content__container')}>
                <a href="#" className={cx('body2__box2__content__container__title')}>News Title Lorem Ipsum Dolor Sit Amet</a>
                <p className={cx('body2__box2__content__container__time')}>1 Hour Ago</p>
              </div>
              <div className={cx('body2__box2__content__img')}></div>
            </div>
            <div className={cx('body2__box2__content')}>
              <div className={cx('body2__box2__content__container')}>
                <a href="#" className={cx('body2__box2__content__container__title')}>News Title Lorem Ipsum Dolor Sit Amet</a>
                <p className={cx('body2__box2__content__container__time')}>1 Hour Ago</p>
              </div>
              <div className={cx('body2__box2__content__img')}></div>
            </div>
            <div className={cx('body2__box2__footer')}>
              <button className={cx('body2__box2__footer__botton')}>Xem thêm</button>
            </div>
          </div>

        </div>
        <div className={cx('body3')}>
          <div className={cx('body3__line')}></div>
        </div>
      </div>
      <div className={cx('page4')}>
        <div className={cx('body1')}>
          <div className={cx('body1__container1')}>
            <h2 className={cx('body1__container1__content')}>Thể lệ cuộc thi</h2>
          </div>
          <div className={cx('body1__container2')}>
            <div className={cx('body1__container2__box')}>
              <div className={cx('body1__container2__box__purplerectangle')}></div>
              <div className={cx('body1__container2__box__content', 'body1__container2__box__content__fixcenter')}>
                <p>Đối tượng</p>
              </div>
            </div>
            <div className={cx('body1__container2__box')}>
              <div className={cx('body1__container2__box__content')}>
                <p>Hình thức Đăng ký</p>
              </div>
            </div>
            <div className={cx('body1__container2__box')}>
              <div className={cx('body1__container2__box__content')}>
                <p>Quy định</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('body2')}>
          <div className={cx('body2__container')}>
            <div className={cx('body2__container__title')}>
              <p>Đối tượng</p>
            </div>
            <div className={cx('body2__container__line')}></div>
            <div className={cx('body2__container__content')}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default Home;
