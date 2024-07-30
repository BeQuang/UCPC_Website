import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormUpdateUser.scss';

const validationSchema = Yup.object().shape({
  teamName: Yup.string()
    .matches(/^[A-Z]/, 'Chữ cái đầu tiên phải viết hoa'),
  paidImage: Yup.mixed()
    .test('fileType', 'Chỉ chấp nhận các định dạng ảnh (jpg, jpeg, png, gif)', (value) => {
      if (!value) return true; // Cho phép trường rỗng (không bắt buộc)
      return value && ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(value.type);
    }),
  isHighSchool: Yup.boolean(),
  trainerName: Yup.string(),
  Participants: Yup.array().of(Yup.object().shape({
    fullName: Yup.string().required('Họ và tên là bắt buộc.'),
    citizenId: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'MSSV/CCCD không hợp lệ.'),
    phone: Yup.string().matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.'),
    birth: Yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Ngày sinh không hợp lệ.'),
    schoolName: Yup.string(),
  })).min(3, 'Phải có ít nhất 3 thành viên').max(3, 'Phải có đúng 3 thành viên'),
});

const NumberOfUser = [1, 2, 3];

const FormUpdateUser = ({ editData, handleChangeDataEdit }) => {
  // console.log("check child data: ", editData)
  const [imageBase64, setImageBase64] = useState('');

  const handleParticipantChange = (e, index, field, setFieldValue) => {
    const { value } = e.target; 
    const updatedParticipants = [...editData.Participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setFieldValue(`Participants[${index}].${field}`, value);
    const newData = { ...editData, Participants: updatedParticipants };
    // console.log(newData)
    handleChangeDataEdit(newData);
  };

  const handleChange = (e, columnId, setFieldValue) => {
    const { value } = e.target;
    setFieldValue(columnId, value);
    const newData = { ...editData, [columnId]: value };
    handleChangeDataEdit(newData);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setFieldValue('paidImage', file);
        handleChangeDataEdit({ ...editData, paidImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='wrapper-form-user'>
      <Formik
        initialValues={{
          userID: editData.id,
          teamName: editData.teamName ? editData.teamName : '',
          paidImage: editData.paidImage ? editData.paidImage: '',
          isHighSchool: editData.isHighSchool ? editData.isHighSchool : '',
          trainerName: editData.trainerName ? editData.trainerName : '',
          Participants: editData.Participants && editData.Participants.length > 0 ? editData.Participants.map(participant => ({
              fullName: participant.fullName ? participant.fullName : '',
              citizenId: participant.citizenId ? participant.citizenId : '',
              phone: participant.phone ? participant.phone : '',
              birth: participant.birth ? participant.birth : '', // Định dạng dd/mm/yyyy
              schoolName: participant.schoolName ? participant.schoolName : ''
          })) : Array(3).fill({ fullName: '', citizenId: '', phone: '', birth: '', schoolName: '' })
        }}
        validationSchema={validationSchema}
      >
        {({ touched, errors, setFieldValue }) => (
          <Form className='form-user-container'>
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
                    onChange={(e) => handleChange(e, 'teamName', setFieldValue)}
                  />
                  <ErrorMessage name="teamName" component="p" className="error" />
                </div>

                <div className='field-container'>
                  <label htmlFor='isHighSchool'><b>Cấp trung học:</b></label>
                  <Field
                    as="select"
                    id="isHighSchool"
                    name="isHighSchool"
                    onChange={(e) => {
                      setFieldValue('isHighSchool', e.target.value === 'true');
                      handleChange(e, 'isHighSchool', setFieldValue);
                    }}
                    className={touched.isHighSchool && errors.isHighSchool ? 'input-error' : ''}
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
                    onChange={(event) => handleImageChange(event, setFieldValue)}
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
                    onChange={(e) => handleChange(e, 'trainerName', setFieldValue)}
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
                        placeholder='Họ và tên'
                        onChange={(e) => handleParticipantChange(e, num - 1, 'fullName', setFieldValue)}
                        className={touched.Participants?.[num - 1]?.fullName && errors.Participants?.[num - 1]?.fullName ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].fullName`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].citizenId`}><b>MSSV/CCCD:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].citizenId`}
                        name={`Participants[${num - 1}].citizenId`}
                        placeholder='MSSV/CCCD'
                        onChange={(e) => handleParticipantChange(e, num - 1, 'citizenId', setFieldValue)}
                        className={touched.Participants?.[num - 1]?.citizenId && errors.Participants?.[num - 1]?.citizenId ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].citizenId`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].phone`}><b>Số điện thoại:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].phone`}
                        name={`Participants[${num - 1}].phone`}
                        placeholder='Số điện thoại'
                        onChange={(e) => handleParticipantChange(e, num - 1, 'phone', setFieldValue)}
                        className={touched.Participants?.[num - 1]?.phone && errors.Participants?.[num - 1]?.phone ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].phone`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].birth`}><b>Ngày sinh:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].birth`}
                        name={`Participants[${num - 1}].birth`}
                        placeholder='Ngày sinh (dd/mm/yyyy)'
                        onChange={(e) => handleParticipantChange(e, num - 1, 'birth', setFieldValue)}
                        className={touched.Participants?.[num - 1]?.birth && errors.Participants?.[num - 1]?.birth ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].birth`} component="p" className="error" />
                    </div>

                    <div className='field-container'>
                      <label htmlFor={`Participants[${num - 1}].schoolName`}><b>Tên trường:</b></label>
                      <Field
                        type='text'
                        id={`Participants[${num - 1}].schoolName`}
                        name={`Participants[${num - 1}].schoolName`}
                        placeholder='Tên trường'
                        onChange={(e) => handleParticipantChange(e, num - 1, 'schoolName', setFieldValue)}
                        className={touched.Participants?.[num - 1]?.schoolName && errors.Participants?.[num - 1]?.schoolName ? 'input-error' : ''}
                      />
                      <ErrorMessage name={`Participants[${num - 1}].schoolName`} component="p" className="error" />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormUpdateUser;
