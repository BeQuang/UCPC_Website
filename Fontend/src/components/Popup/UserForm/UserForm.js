import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Wrapper, Title, FormSection, Separator, StyledLabel, StyledInput, ErrorMessage, SignUpButton } from './StyleComponents';
import { validateFormUser } from './ValidationFormUser';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nameofteam: '',
    email: '',
    fullname1: '',
    identity1: '',
    phonenumber1: '',
    school1: '',
    fullname2: '',
    identity2: '',
    phonenumber2: '',
    school2: '',
    fullname3: '',
    identity3: '',
    phonenumber3: '',
    school3: '',
  });

  const [errors, setErrors] = useState({});

  // Hàm xử lý khi có sự thay đổi giá trị trong các ô nhập liệu
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Hàm xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormUser(formData, setErrors)) {
      // Xử lý khi form hợp lệ
      console.log('Form submitted', formData);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('form-container')}>
        <div className={cx('title')}>
          <h1>Đăng kí đội thi UCPC</h1>
        </div>
        <span className={cx('separator')} />
        <div className={cx('content')}>
          <div className={cx('content1')}>
            <label htmlFor="nameofteam">
              <b>Tên đội:</b>
            </label>
            <input
              type='text'
              id="nameofteam"
              placeholder='Viết hoa chữ cái đầu tiên. Ví dụ: Team01'
              required
            />
            <label htmlFor='email'>
              <b>Email:</b>
            </label>
            <input
              type='email'
              id='email'
              placeholder='Ví dụ:abcd@efgh.com'
              required
            />
          </div>
          <span className={cx('separator')} />
          <div className={cx('content2')}>
            <span><h2>Thành viên 1 (Đội trưởng):</h2></span>
            <label htmlFor='fullname'><b>Họ và tên:</b></label>
            <input
              id='fullname'
              placeholder='Ví dụ: Nguyễn Văn A'
            />
            <label htmlFor='identity'><b>MSSV/CCCD:</b></label>
            <input
              id='identity'
              placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
            />
            <label htmlFor='phonenumber'><b>Số điện thoại:</b></label>
            <input
              id='phonenumber'
              placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
            />
            <label htmlFor='school'><b>Tên trường:</b></label>
            <input
              id='school'
              placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
            />
          </div>
          <span className={cx('separator')} />
          <div className={cx('content3')}>
            <span><h2>Thành viên 2:</h2></span>
            <label htmlFor='fullname'><b>Họ và tên:</b></label>
            <input
              id='fullname'
              placeholder='Ví dụ: Nguyễn Văn A'
            />
            <label htmlFor='identity'><b>MSSV/CCCD:</b></label>
            <input
              id='identity'
              placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
            />
            <label htmlFor='phonenumber'><b>Số điện thoại:</b></label>
            <input
              id='phonenumber'
              placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
            />
            <label htmlFor='school'><b>Tên trường:</b></label>
            <input
              id='school'
              placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
            />
          </div>
          <span className={cx('separator')} />
          <div className={cx('content4')}>
            <span><h2>Thành viên 3:</h2></span>
            <label htmlFor='fullname'><b>Họ và tên:</b></label>
            <input
              id='fullname'
              placeholder='Ví dụ: Nguyễn Văn A'
            />
            <label htmlFor='identity'><b>MSSV/CCCD:</b></label>
            <input
              id='identity'
              placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
            />
            <label htmlFor='phonenumber'><b>Số điện thoại:</b></label>
            <input
              id='phonenumber'
              placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
            />
            <label htmlFor='school'><b>Tên trường:</b></label>
            <input
              id='school'
              placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
            />
          </div>
          <span className={cx('separator')} />
          <div className={cx('btn-signup')}>
            <button><h2>Đăng kí đội</h2></button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserForm
