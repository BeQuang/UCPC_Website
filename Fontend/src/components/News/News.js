import './News.scss';
import NewsItem from './NewsItem';

function News() {
  return (
    <div className={'news'} id={'news-section'}>
      <div className={'news-header'}>
        <div className={'title'}>
          <p>TIN TỨC</p>
        </div>
        <div className={'line'}></div>
        <div className={'title'}>
          <p>UCPC</p>
        </div>
      </div>
      <div className={'body'}>
        <div className={'marjor-news'}>
          <div className={'wrapper'}>
            <a href="/" className={'title'}>
              Massa tortor nibh nulla condimentum imperdiet scelerisque...
            </a>
            <p className={'time'}>2 Hours Ago</p>
          </div>
        </div>
        <div className={'related-news'}>
          <NewsItem title={'News Title Lorem Ipsum Dolor Sit Amet'} time={'1 Hour Ago'} />
          <NewsItem title={'News Title Lorem Ipsum Dolor Sit Amet'} time={'1 Hour Ago'} />
          <NewsItem title={'News Title Lorem Ipsum Dolor Sit Amet'} time={'1 Hour Ago'} />

          <button className={'btn-see-also'}>Xem thêm</button>
        </div>
      </div>
    </div>
  );
}

export default News;
