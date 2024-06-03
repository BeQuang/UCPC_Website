import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserForm.scss';

const validationSchema = Yup.object({
  nameofteam: Yup.string().matches(/^[A-Z]/, 'Chữ cái đầu tiên phải viết hoa').required('Tên đội là bắt buộc.'),
  email: Yup.string().email('Email không hợp lệ.').required('Email là bắt buộc.'),
  fullname1: Yup.string().required('Họ và tên là bắt buộc.'),
  identity1: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'MSSV/CCCD không hợp lệ.').required('MSSV/CCCD là bắt buộc.'),
  phonenumber1: Yup.string().matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.').required('Số điện thoại là bắt buộc.'),
  school1: Yup.string().required('Tên trường là bắt buộc.'),
  fullname2: Yup.string().required('Họ và tên là bắt buộc.'),
  identity2: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'MSSV/CCCD không hợp lệ.').required('MSSV/CCCD là bắt buộc.'),
  phonenumber2: Yup.string().matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.').required('Số điện thoại là bắt buộc.'),
  school2: Yup.string().required('Tên trường là bắt buộc.'),
  fullname3: Yup.string().required('Họ và tên là bắt buộc.'),
  identity3: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'MSSV/CCCD không hợp lệ.').required('MSSV/CCCD là bắt buộc.'),
  phonenumber3: Yup.string().matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.').required('Số điện thoại là bắt buộc.'),
  school3: Yup.string().required('Tên trường là bắt buộc.'),
});
const NumberOfUser = [1, 2, 3]
const UserForm = () => {
  return (
    <div className='wrapper-form-user'> {/* Thẻ div bọc bên ngoài cùng với class CSS */}
      <Formik
        initialValues={{
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
        }}
        validationSchema={validationSchema} // Gán schema xác thực vào Formik
        onSubmit={(values) => {
          console.log('Form submitted', values); // Hàm xử lý khi form được submit
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className='form-user-container'> {/* Thẻ form với class CSS */}
            <div className='title-form-user'>
              <h1>Đăng kí đội thi UCPC</h1> {/* Tiêu đề của form */}
            </div>
            <span className='separator' style={{ height: '5px' }} /> {/* Đường kẻ ngăn cách */}
            <div className='content-form-user'>
              <div className='content1-form-user'>
                <label htmlFor="nameofteam"><b>Tên đội:</b></label>
                <Field
                  type='text'
                  id="nameofteam"
                  name="nameofteam"
                  placeholder='Viết hoa chữ cái đầu tiên. Ví dụ: Team01'
                  className={touched.nameofteam && errors.nameofteam ? 'input-error' : ''} // Thêm class 'input-error' nếu có lỗi
                />
                <ErrorMessage name="nameofteam" component="p" className="error" /> {/* Hiển thị thông báo lỗi nếu có */}

                <label htmlFor='email'><b>Email:</b></label>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Ví dụ: abcd@efgh.com'
                  className={touched.email && errors.email ? 'input-error' : ''} // Thêm class 'input-error' nếu có lỗi
                />
                <ErrorMessage name="email" component="p" className="error" /> {/* Hiển thị thông báo lỗi nếu có */}
              </div>
              <span className='separator' /> {/* Đường kẻ ngăn cách */}
              {NumberOfUser.map((num) => (
                <React.Fragment key={num}>
                  <div className={`content${num}-form-user`}>
                    <span><h2>Thành viên {num} {num === '1' && '(Đội trưởng)'}</h2></span>

                    <label htmlFor={`fullname${num}`}><b>Họ và tên:</b></label>
                    <Field
                      type='text'
                      id={`fullname${num}`}
                      name={`fullname${num}`}
                      placeholder='Ví dụ: Nguyễn Văn A'
                      className={touched[`fullname${num}`] && errors[`fullname${num}`] ? 'input-error' : ''} // Thêm class 'input-error' nếu có lỗi
                    />
                    <ErrorMessage name={`fullname${num}`} component="p" className="error" /> {/* Hiển thị thông báo lỗi nếu có */}

                    <label htmlFor={`identity${num}`}><b>MSSV/CCCD:</b></label>
                    <Field
                      id={`identity${num}`}
                      name={`identity${num}`}
                      placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
                      className={touched[`identity${num}`] && errors[`identity${num}`] ? 'input-error' : ''} // Thêm class 'input-error' nếu có lỗi
                    />
                    <ErrorMessage name={`identity${num}`} component="p" className="error" /> {/* Hiển thị thông báo lỗi nếu có */}

                    <label htmlFor={`phonenumber${num}`}><b>Số điện thoại:</b></label>
                    <Field
                      id={`phonenumber${num}`}
                      name={`phonenumber${num}`}
                      placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
                      className={touched[`phonenumber${num}`] && errors[`phonenumber${num}`] ? 'input-error' : ''} // Thêm class 'input-error' nếu có lỗi
                    />
                    <ErrorMessage name={`phonenumber${num}`} component="p" className="error" /> {/* Hiển thị thông báo lỗi nếu có */}

                    <label htmlFor={`school${num}`}><b>Tên trường:</b></label>
                    <Field
                      id={`school${num}`}
                      name={`school${num}`}
                      placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
                      className={touched[`school${num}`] && errors[`school${num}`] ? 'input-error' : ''} // Thêm class 'input-error' nếu có lỗi
                    />
                    <ErrorMessage name={`school${num}`} component="p" className="error" /> {/* Hiển thị thông báo lỗi nếu có */}
                  </div>
                  <span className='separator' /> {/* Đường kẻ ngăn cách */}
                </React.Fragment>
              ))}
              <div className='btn-signup'>
                <button type="submit" disabled={isSubmitting}><h2>Đăng kí đội</h2></button> {/* Nút đăng ký */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;

