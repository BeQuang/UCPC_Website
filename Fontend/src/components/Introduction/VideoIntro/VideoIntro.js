import './VideoIntro.scss';
import { Link } from 'react-router-dom';

function VideoIntro() {
  return (
    <div className={"video-intro"}>
      <div className={'body'}>
        <div className={'bg-img'}>
          <div className={'overlay'}>
            <div className={'title'}>
              <h1>UIT COLLEGIATE</h1>
              <h2>PROGRAMMING CONTEST</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus varius quam in
                tincidunt. Vestibulum a ultricies risus. Aenean auctor sodales dolor non posuere.
                Vestibulum nec nulla posuere, sollicitudin ligula.
              </p>
              <button className={'button'}>
                <Link to='/registration'>
                  Đăng ký tham gia
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className={'footer'}></footer>
    </div>
  );
}

export default VideoIntro;
