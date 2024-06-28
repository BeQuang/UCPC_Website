import React, { useState, useEffect } from 'react';
import './EventSchedule.scss';
import News from '~/assets/image/News.jpg';
import Description_Intro from '~/assets/image/Description_Intro.jpg';

function EventSchedule() {
  const calculateTimeLeft = () => {
    const eventDate = new Date('2024-11-20T00:00:00').getTime();
    const now = new Date();
    const difference = eventDate - now;
    console.log("eventDate:", eventDate)
    console.log("Now:", now)
    console.log("diff:", difference)

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className={'event'}>
      <section className={'countdown'}>
        <h2 className={'countdown-content'}>Thời gian đăng ký</h2>
        <div className={'timer'}>
          <div className={'time-box'}>
            <div className={'time'}>{String(timeLeft.days).padStart(2, '0')}</div>
            <div className={'label'}>Ngày</div>
          </div>
          <div className={'time-box'}>
            <div className={'time'}>{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className={'label'}>Giờ</div>
          </div>
          <div className={'time-box'}>
            <div className={'time'}>{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className={'label'}>Phút</div>
          </div>
        </div>
      </section>
      <section className={'schedule'}>
        <div className={'title'}>
          <div className={'body1'}>
            <div className={'container'}>
              <h2 className={'container-content'}>Lịch</h2>
            </div>
            <div className={'body1-img'}>
              <img src={News} alt={'News'} className={'news'} />
            </div>
          </div>
          <div className={'body2'}>
            <div className={'body2-img'}>
              <img src={Description_Intro} alt={'Description Intro'} className={'description_Intro'} />
            </div>
            <div className={'container'}>
              <h2 className={'container-content'}>Trình</h2>
            </div>
          </div>
        </div>
        <div className={'timeline'}>
          <div className={'container'}>
            <div className={'body-1'}>
              <div className={'date-1'}>24.04.24</div>
              <div className={'body-1-content'}>
                <div className={'text-1'}>Lorem ipsum dolor sit amet</div>
              </div>
            </div>
            <div className={'body-2'}>
              <div className={'body-2-content'}>
                <div className={'text-2'}>Lorem ipsum dolor sit amet</div>
              </div>
              <div className={'date-2'}>24.04.24</div>
            </div>
            <div className={'body-1'}>
              <div className={'date-1'}>24.04.24</div>
              <div className={'body-1-content'}>
                <div className={'text-1'}>Lorem ipsum dolor sit amet</div>
              </div>
            </div>
            <div className={'body-2'}>
              <div className={'body-2-content'}>
                <div className={'text-2'}>Lorem ipsum dolor sit amet</div>
              </div>
              <div className={'date-2'}>24.04.24</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventSchedule;
