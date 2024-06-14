import React from 'react';
import './HomeFooter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function HomeFooter() {
  return (
    <div className="homefooter" id={'homefooter-section'}>
      <div className="content">
        <div className="column">
          <h2 className="column-title">Đơn vị tổ chức</h2>
        </div>
        <div className="column">
          <h2 className="column-title">Nhà tài trợ</h2>
        </div>
        <div className="column">
          <h2 className="column-title">Nhà tài trợ</h2>
        </div>
      </div>
      <footer>
        <div className="footer-left">
          <h2 className="footer-site-name">Site name</h2>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-column">
            <h3 className="footer-topic">Topic</h3>
            <p>Page</p>
            <p>Page</p>
            <p>Page</p>
          </div>
          <div className="footer-column">
            <h3 className="footer-topic">Topic</h3>
            <p>Page</p>
            <p>Page</p>
            <p>Page</p>
          </div>
          <div className="footer-column">
            <h3 className="footer-topic">Topic</h3>
            <p>Page</p>
            <p>Page</p>
            <p>Page</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeFooter;
