import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserForm.scss';

const validationSchema = Yup.object({
  nameofteam: Yup.string().matches(/^[A-Z]/, 'Chữ cái đầu tiên phải viết hoa').required('Tên đội là bắt buộc.'),
  email: Yup.string().email('Email không hợp lệ.').required('Email là bắt buộc.'),
  members: Yup.array().of(Yup.object().shape({
    fullname: Yup.string().required('Họ và tên là bắt buộc.'),
    identity: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'MSSV/CCCD không hợp lệ.').required('MSSV/CCCD là bắt buộc.'),
    phonenumber: Yup.string().matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.').required('Số điện thoại là bắt buộc.'),
    school: Yup.string().required('Tên trường là bắt buộc.'),
  })).length(3, 'Phải có đúng 3 thành viên'),
});

const NumberOfUser = [1, 2, 3];

const UserForm = () => {
  return (
    <div className='wrapper-form-user'>
      <Formik
        initialValues={{
          nameofteam: '',
          email: '',
          members: [
            { fullname: '', identity: '', phonenumber: '', school: '' },
            { fullname: '', identity: '', phonenumber: '', school: '' },
            { fullname: '', identity: '', phonenumber: '', school: '' },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted', values);
          // Xử lý gửi dữ liệu lên server hoặc các thao tác khác ở đây
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className='form-user-container'>
            <div className='title-form-user'>
              <h1>Đăng kí đội thi UCPC</h1>
            </div>
            <span className='separator' style={{ height: '5px' }} />
            <div className='content-form-user'>
              <div className='content1-form-user'>
                <div className='field-container'>
                  <label htmlFor="nameofteam"><b>Tên đội:</b></label>
                  <Field
                    type='text'
                    id="nameofteam"
                    name="nameofteam"
                    placeholder='Viết hoa chữ cái đầu tiên. Ví dụ: Team01'
                    className={touched.nameofteam && errors.nameofteam ? 'input-error' : ''}
                  />
                  <ErrorMessage name="nameofteam" component="p" className="error" />
                </div>

                <div className='field-container'>
                  <label htmlFor='email'><b>Email:</b></label>
                  <Field
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Ví dụ: abcd@efgh.com'
                    className={touched.email && errors.email ? 'input-error' : ''}
                  />
                  <ErrorMessage name="email" component="p" className="error" />
                </div>
              </div>
              <span className='separator' />
              {NumberOfUser.map((num) => (
                <React.Fragment key={num}>
                  <div className={`content${num}-form-user`}>
                    <span><h2>Thành viên {num} {num === 1 && '(Đội trưởng)'}</h2></span>

                    <div className='field-container'>
                      <label htmlFor={`members[${num - 1}].fullname`}><b>Họ và tên:</b></label>
                      <Field
                        type='text'
                        id={`members[${num - 1}].fullname`}
                        name={`members[${num - 1}].fullname`}
                        placeholder='Ví dụ: Nguyễn Văn A'
                        className={touched.members && touched.members[num - 1] && errors.members && errors.members[num - 1] && errors.members[num - 1].fullname ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`members[${num - 1}].fullname`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`members[${num - 1}].identity`}><b>MSSV/CCCD:</b></label>
                      <Field
                        id={`members[${num - 1}].identity`}
                        name={`members[${num - 1}].identity`}
                        placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
                        className={touched.members && touched.members[num - 1] && errors.members && errors.members[num - 1] && errors.members[num - 1].identity ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`members[${num - 1}].identity`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`members[${num - 1}].phonenumber`}><b>Số điện thoại:</b></label>
                      <Field
                        id={`members[${num - 1}].phonenumber`}
                        name={`members[${num - 1}].phonenumber`}
                        placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
                        className={touched.members && touched.members[num - 1] && errors.members && errors.members[num - 1] && errors.members[num - 1].phonenumber ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`members[${num - 1}].phonenumber`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`members[${num - 1}].school`}><b>Tên trường:</b></label>
                      <Field
                        id={`members[${num - 1}].school`}
                        name={`members[${num - 1}].school`}
                        placeholder='Ví dụ: Trường Đại học Công nghệ Thông tin'
                        className={touched.members && touched.members[num - 1] && errors.members && errors.members[num - 1] && errors.members[num - 1].school ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`members[${num - 1}].school`} component="p" className="error" />
                    </div>
                  </div>
                  <span className='separator' />
                </React.Fragment>
              ))}
              <div className='btn-signup'>
                <button type="submit" disabled={isSubmitting}><h2>Đăng kí đội</h2></button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
