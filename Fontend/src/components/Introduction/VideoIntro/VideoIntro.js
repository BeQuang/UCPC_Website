import './VideoIntro.scss';
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import Register from '~/components/Popup/Register';
import img1 from '~/assets/image/Video_Intro.jpg'
import img2 from '~/assets/image/Description_Intro.jpg'
import img3 from '~/assets/image/News.jpg'


const images = [img1, img2, img3];

function VideoIntro() {
  // Xét mở trang đăng kí
  const [openRegister, setOpenRegister] = useState(false);
  // Xét chuyển slide
  const [currentSlide, setCurrentSlide] = useState(0);
  // Xét đã đăng nhập or chưa đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleRegister = () => {
    setOpenRegister(true);
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    // }, 3000); // Change slide every 2 seconds
    // return () => clearInterval(interval);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  }, []);

  const currentDiv = (n) => {
    setCurrentSlide(n - 1);
  };

  return (
    <div className={'video-intro'} id={'video-intro-section'}>
      <div className={'body'} style={{ backgroundImage: `url(${images[currentSlide]})` }}>
        <div className={'overlay'}>
          <div className={'title'}>
            <h1>UIT COLLEGIATE</h1>
            <h2>PROGRAMMING CONTEST</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus varius quam in
              tincidunt. Vestibulum a ultricies risus. Aenean auctor sodales dolor non posuere.
              Vestibulum nec nulla posuere, sollicitudin ligula.
            </p>
            <button className={'button'} onClick={handleRegister}>
              {isLoggedIn ? 'Nộp lệ phí' : 'Đăng ký tham gia'}
            </button>
          </div>
        </div>
        <div className={'nav-buttons'}>
          {images.map((_, index) => (
            <span
              key={index}
              className={'button'}
              onClick={() => currentDiv(index + 1)}
              style={{ backgroundColor: currentSlide === index ? '#4B2882CC' : '#D9D9D9B2' }}
            ></span>
          ))}
        </div>
        <Popup open={openRegister} onClose={() => setOpenRegister(false)}>
          <Register />
        </Popup>
      </div>
      <footer className={'footer'}></footer>
    </div>
  );
}

export default VideoIntro;
