import classNames from 'classnames/bind';
import styles from './RulesItem.module.scss';

const cx = classNames.bind(styles);

function RulesItem({ title, description }) {
    return (
        <>
            <div className={cx('title')}>{title}</div>
            <div className={cx('line')}></div>
            <div className={cx('description')}>{description}</div>
        </>
    );
}

export default RulesItem;
