import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Popup from '~/components/Popup';

const cx = classNames.bind(styles);

function Home() {
    return <Popup className={cx('wrapper')}>Home page</Popup>;
}

export default Home;
