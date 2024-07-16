import React, { useState } from 'react';
import './Rules.scss';
import RulesItem from './RulesItem';

function Rules() {
  const [activeType, setActiveType] = useState('Đối tượng');

  const handleClick = (type) => {
    setActiveType(type);
  };

  return (
    <div className={'rules'} id={'rules-section'}>
      <div className={'header'}>
        <h2 className={'title'}>Thể lệ cuộc thi</h2>
        <div className={'type-list'}>
          <div className={`type-item ${activeType === 'Đối tượng' ? 'active' : ''}`} onClick={() => handleClick('Đối tượng')}>
            <p>Đối tượng</p>
          </div>
          <div className={`type-item ${activeType === 'Hình thức Đăng ký' ? 'active' : ''}`} onClick={() => handleClick('Hình thức Đăng ký')}>
            <p>Hình thức Đăng ký</p>
          </div>
          <div className={`type-item ${activeType === 'Quy định' ? 'active' : ''}`} onClick={() => handleClick('Quy định')}>
            <p>Quy định</p>
          </div>
        </div>
      </div>
      <div className={'body'}>
        <RulesItem
          title={activeType}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquipex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eufugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officiadeserunt mollit anim id est laborum.'
          }
        />
      </div>
    </div>
  );
}

export default Rules;
