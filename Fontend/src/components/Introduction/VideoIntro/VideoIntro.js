import './VideoIntro.scss';
import { postLogin } from '~/services/authService';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import Register from '~/components/Popup/Register';

function VideoIntro() {
    const [openRegister, setOpenRegister] = useState(false);
    const handleRegister = () => {
        setOpenRegister(true);
    };
    return (
        <div className="video-intro">
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
                            <button className={'button'} onClick={() => handleRegister()}>
                                Đăng ký tham gia
                            </button>
                        </div>
                    </div>
                </div>
            <Popup open={openRegister} onClose={() => setOpenRegister(false)}>
                <Register />   
            </Popup>
            </div>
            
            <footer className={'footer'}></footer>
        </div>
      </div>
    </div>
  );
}

export default VideoIntro;
