import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Autosuggest from 'react-autosuggest';
import schools from '~/pages/User/schools';
import './UserForm.scss';

// Validation Schema
const validationSchema = Yup.object().shape({
  teamName: Yup.string()
    .matches(/^[A-Z]/, 'Chữ cái đầu tiên phải viết hoa')
    .required('Tên đội là bắt buộc.'),
  paidImage: Yup.mixed()
    .required('Ảnh biên lai là bắt buộc.')
    .test('fileType', 'Chỉ chấp nhận các định dạng ảnh (jpg, jpeg, png, gif)', (value) => {
      if (!value) return true; // Cho phép trường rỗng (không bắt buộc)
      return value && ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(value.type);
    }),
  isHighSchool: Yup.boolean().required('Cấp học là bắt buộc.'),
  trainerName: Yup.string().required('Tên huấn luyện viên là bắt buộc.'),
  Participants: Yup.array().of(Yup.object().shape({
    fullName: Yup.string().required('Họ và tên là bắt buộc.'),
    citizenId: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'MSSV/CCCD không hợp lệ.').required('MSSV/CCCD là bắt buộc.'),
    phone: Yup.string().matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.').required('Số điện thoại là bắt buộc.'),
    birth: Yup.date().required('Ngày sinh là bắt buộc.').nullable(),
    schoolName: Yup.string().required('Tên trường là bắt buộc.'),
  })).min(3, 'Phải có ít nhất 3 thành viên').max(3, 'Phải có đúng 3 thành viên'),
});

const NumberOfUser = [1, 2, 3]

// Get suggestions for Autosuggest
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : schools.filter(
    school => school.toLowerCase().includes(inputValue)
  );
};

// Autosuggest handlers
const getSuggestionValue = (suggestion) => suggestion;
const renderSuggestion = (suggestion) => suggestion;

const UserForm = () => {
  const [imageBase64, setImageBase64] = useState('');

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = { ...values, userID: '12312312', paidImage: imageBase64 };
    console.log('Form submitted', formData);

    // Perform server submission or other actions
    try {
      // Implement submission logic here
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  return (
    <div className='wrapper-form-user'>
      <Formik
        initialValues={{
          teamName: '',
          paidImage: '',
          isHighSchool: '',
          trainerName: '',
          Participants: [
            { fullName: '', citizenId: '', phone: '', birth: '', schoolName: '' },
            { fullName: '', citizenId: '', phone: '', birth: '', schoolName: '' },
            { fullName: '', citizenId: '', phone: '', birth: '', schoolName: '' },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, touched, errors, setFieldValue, values }) => (
          <Form className='form-user-container'>
            <div className='title-form-user'>
              <h1>Đăng kí đội thi UCPC</h1>
            </div>
            <span className='separator' style={{ height: '5px' }} />
            <div className='content-form-user'>
              <div className='content1-form-user'>
                <div className='field-container'>
                  <label htmlFor="teamName"><b>Tên đội:</b></label>
                  <Field
                    type='text'
                    id="teamName"
                    name="teamName"
                    placeholder='Viết hoa chữ cái đầu tiên. Ví dụ: Team01'
                    className={touched.teamName && errors.teamName ? 'input-error' : ''}
                  />
                  <ErrorMessage name="teamName" component="p" className="error" />
                </div>

                <div className='field-container'>
                  <label htmlFor='isHighSchool'><b>Cấp trung học:</b></label>
                  <Field
                    as="select"
                    id="isHighSchool"
                    name="isHighSchool"
                    className={touched.isHighSchool && errors.isHighSchool ? 'input-error' : ''}
                    onChange={(e) => {
                      setFieldValue('isHighSchool', e.target.value === 'true');
                    }}
                  >
                    <option value="">-- Chọn --</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Field>
                  <ErrorMessage name="isHighSchool" component="p" className="error" />
                </div>

                <div className='field-container'>
                  <label htmlFor='paidImage'><b>Ảnh biên lai:</b></label>
                  <input
                    type='file'
                    id='paidImage'
                    name='paidImage'
                    onChange={(event) => {
                      setFieldValue('paidImage', event.currentTarget.files[0]);
                      handleImageChange(event);
                    }}
                    className={touched.paidImage && errors.paidImage ? 'input-error' : ''}
                  />
                  <ErrorMessage name="paidImage" component="p" className="error" />
                </div>

                <div className='field-container'>
                  <label htmlFor='trainerName'><b>Tên huấn luyện viên:</b></label>
                  <Field
                    type='text'
                    id='trainerName'
                    name='trainerName'
                    placeholder='Tên huấn luyện viên'
                    className={touched.trainerName && errors.trainerName ? 'input-error' : ''}
                  />
                  <ErrorMessage name="trainerName" component="p" className="error" />
                </div>
              </div>
              <span className='separator' />
              {NumberOfUser.map((num) => (
                <React.Fragment key={num}>
                  <div className={`content${num}-form-user`}>
                    <span><h2>Thành viên {num} {num === 1 && '(Đội trưởng)'}</h2></span>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].fullName`}><b>Họ và tên:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].fullName`}
                        name={`Participants[${num - 1}].fullName`}
                        placeholder='Ví dụ: Nguyễn Văn A'
                        className={touched.Participants && touched.Participants[num - 1] && errors.Participants && errors.Participants[num - 1] && errors.Participants[num - 1].fullName ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].fullName`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].citizenId`}><b>MSSV/CCCD:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].citizenId`}
                        name={`Participants[${num - 1}].citizenId`}
                        placeholder='MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd'
                        className={touched.Participants && touched.Participants[num - 1] && errors.Participants && errors.Participants[num - 1] && errors.Participants[num - 1].citizenId ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].citizenId`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].phone`}><b>Số điện thoại:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].phone`}
                        name={`Participants[${num - 1}].phone`}
                        placeholder='Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789'
                        className={touched.Participants && touched.Participants[num - 1] && errors.Participants && errors.Participants[num - 1] && errors.Participants[num - 1].phone ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].phone`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].birth`}><b>Ngày sinh:</b></label>
                      <Field
                        type='date'
                        id={`Participants[${num - 1}].birth`}
                        name={`Participants[${num - 1}].birth`}
                        className={touched.Participants && touched.Participants[num - 1] && errors.Participants && errors.Participants[num - 1] && errors.Participants[num - 1].birth ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].birth`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].schoolName`}><b>Tên trường:</b></label>
                      <Field name={`Participants[${num - 1}].schoolName`}>
                        {({ field, form }) => (
                          <Autosuggest
                            suggestions={getSuggestions(field.value)}
                            onSuggestionsFetchRequested={({ value }) => {
                              form.setFieldValue(`Participants[${num - 1}].schoolName`, value);
                            }}
                            onSuggestionsClearRequested={() => { }}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                              ...field,
                              placeholder: 'Ví dụ: Trường Đại học Công nghệ Thông tin',
                              className: touched.Participants && touched.Participants[num - 1] && errors.Participants && errors.Participants[num - 1] && errors.Participants[num - 1].schoolName ? 'input-error' : '',
                            }}
                            onSuggestionSelected={(event, { suggestion }) => {
                              form.setFieldValue(`Participants[${num - 1}].schoolName`, suggestion);
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage name={`Participants[${num - 1}].schoolName`} component="p" className="error" />
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
