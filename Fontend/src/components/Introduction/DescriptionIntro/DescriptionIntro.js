import classNames from 'classnames/bind';
import styles from './DescriptionIntro.module.scss';

const cx = classNames.bind(styles);

function DescriptionIntro() {
    return (
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
                    <img
                        src="https://s3-alpha-sig.figma.com/img/2a82/9740/50cac91b6c99f1dd6b818fc2c799e3d5?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CJmnMN~xeNaFztTd-o5LmJDV4Z8rQkVhhLvHO9qoAqfNOc1V7N6DhiGjJYBladto6Z2aSuOEKn3fC1~Pho5rdTidW2Kq6t4M4SoYL3MoMX9lZ7ocLSUJ4qJaOsXe~tGYUTVSGUFMwBR0V0DAP4vhXVwUenP67Ox-13jVE60YaRV0usEJGqUn4CA7Z2Ns0uBEIBmgRtxgvzT1CYQlZDp6yPcGURIbr7PikwhTz21SitAav0eKfQ5ARZgUhiscP7yyUfar8gN47lar3z--MpSmnNpZwZ-4ZdSBet4m7UwmoYUm8~YCfmN6~genc~I3iVBh9lpe-oNxbW-2ASGjLzSyaA__"
                        alt=""
                        className={cx('body2__content__logo')}
                    />
                    <h1 className={cx('body2__content__title')}>UCPC 2024</h1>
                    <p className={cx('body2__content__content')}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DescriptionIntro;
