import React from "react";
import "./RegistrationPage.scss";
import { useState, useEffect } from 'react';
import Registration_Page from '~/assets/image/Registration_page.jpg';
import Popup from 'reactjs-popup';
import Register from '~/components/Popup/Register';


function RegistrationPage() {
  const [openRegister, setOpenRegister] = useState(false);

  const handleRegister = () => {
    setOpenRegister(true);
  };

  return (
    <div className={'registration'} id={'registration-section'}>
      <section class={'hero'}>
        <div class={'hero-content'}>
          <h1 className={'hero-title'}>Đăng ký ngay</h1>
          <p className={'hero-text'}>And a subheading describing your site, too</p>
          <button className={'hero-button'} onClick={handleRegister}>Đăng ký</button>
        </div>
      </section>
      <section class={'content'}>
        <div class={'left'}>
          <p className={'left-text-1'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis mattis eros, gravida rhoncus nunc sodales et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed sit amet vehicula orci. Suspendisse commodo pretium massa vitae sagittis. Proin venenatis gravida arcu nec pharetra. Quisque non dolor feugiat, tempor nisl sit amet, euismod leo. Morbi volutpat convallis diam laoreet convallis. Aenean in metus at risus accumsan ullamcorper. Phasellus et convallis neque. Curabitur dictum gravida purus ut dapibus. Pellentesque quis feugiat leo, quis consequat turpis. In vel ante in ipsum posuere dignissim ut at felis. Quisque dignissim augue.</p>
        </div>
        <div class={'right'}>
          <img src={Registration_Page} alt={'Registration_Page'} className={'registration_img'} />
          <div class={'prize-info'}>
            <p className={'right-text-1'}>Tổng giải thưởng lên tới</p>
            <h2 className={'right-text-2'}>30.000.000</h2>
            <p className={'right-text-1'}>triệu đồng</p>
          </div>
        </div>
      </section>
      <Popup
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      >
        <Register />
      </Popup>
    </div>
  );
}

export default RegistrationPage;