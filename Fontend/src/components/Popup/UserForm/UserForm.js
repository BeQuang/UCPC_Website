import React from 'react'
import classNames from 'classnames/bind'
import styles from './UserForm.module.scss'

const cx = classNames.bind(styles)

const UserForm = () => {
  return (
    <div className={cx('wrapper')}>
      <form className={cx('form-container')}>
        <div className={cx('title')}>
          <h1>Đăng kí đội thi UCPC</h1>
        </div>
        <span className={cx('separator')} style={{ height: "5px" }} />
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
            <label htmlFor='fullname1'><b>Họ và tên:</b></label>
            <input
              id='fullname1'
              placeholder='Ví dụ: Nguyễn Văn A'
            />
            <label htmlFor='identity1'><b>MSSV/CCCD:</b></label>
            <input
              id='identity1'
              placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
            />
            <label htmlFor='phonenumber1'><b>Số điện thoại:</b></label>
            <input
              id='phonenumber1'
              placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
            />
            <label htmlFor='school1'><b>Tên trường:</b></label>
            <input
              id='school1'
              placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
            />
          </div>
          <span className={cx('separator')} />
          <div className={cx('content3')}>
            <span><h2>Thành viên 2:</h2></span>
            <label htmlFor='fullname2'><b>Họ và tên:</b></label>
            <input
              id='fullname2'
              placeholder='Ví dụ: Nguyễn Văn A'
            />
            <label htmlFor='identity2'><b>MSSV/CCCD:</b></label>
            <input
              id='identity2'
              placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
            />
            <label htmlFor='phonenumber2'><b>Số điện thoại:</b></label>
            <input
              id='phonenumber2'
              placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
            />
            <label htmlFor='school2'><b>Tên trường:</b></label>
            <input
              id='school2'
              placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
            />
          </div>
          <span className={cx('separator')} />
          <div className={cx('content4')}>
            <span><h2>Thành viên 3:</h2></span>
            <label htmlFor='fullname3'><b>Họ và tên:</b></label>
            <input
              id='fullname3'
              placeholder='Ví dụ: Nguyễn Văn A'
            />
            <label htmlFor='identity3'><b>MSSV/CCCD:</b></label>
            <input
              id='identity3'
              placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
            />
            <label htmlFor='phonenumber3'><b>Số điện thoại:</b></label>
            <input
              id='phonenumber3'
              placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
            />
            <label htmlFor='school3'><b>Tên trường:</b></label>
            <input
              id='school3'
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
