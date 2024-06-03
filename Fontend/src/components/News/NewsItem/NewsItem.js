import './NewsItem.scss';

function NewsItem({ link = '/', title, time, img }) {
    return (
        <div className={'news-item'}>
            <div className={'wrapper'}>
                <a href={link} className={'title'}>
                    {title}
                </a>
                <p className={'time'}>{time}</p>
            </div>
            <div className={'img'}>
                <img src={img} alt="noImage" />
            </div>
        </div>
    );
}

export default NewsItem;
