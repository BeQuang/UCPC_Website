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
    <Container maxWidth='md'>
      <Wrapper component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Title variant="h2" align="center" gutterBottom>
          Đăng kí đội thi UCPC
        </Title>
        <Separator />

        {/* Phần nhập liệu cho tên đội */}
        <FormSection>
          <StyledLabel htmlFor="nameofteam">Tên đội:</StyledLabel>
          <StyledInput
            id="nameofteam"
            placeholder="Viết hoa chữ cái đầu tiên. Ví dụ: Team01"
            value={formData.nameofteam}
            onChange={handleChange}
          />
          {errors.nameofteam && <ErrorMessage>{errors.nameofteam}</ErrorMessage>}
        </FormSection>

        {/* Phần nhập liệu cho email */}
        <FormSection>
          <StyledLabel htmlFor="email">Email:</StyledLabel>
          <StyledInput
            id="email"
            placeholder="Ví dụ: abcd@efgh.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormSection>

        <Separator />

        {/* Phần nhập liệu cho thông tin thành viên 1 */}
        <FormSection>
          <Typography variant="h3" gutterBottom>
            Thành viên 1 (Đội trưởng):
          </Typography>
          <StyledLabel htmlFor="fullname1">Họ và tên:</StyledLabel>
          <StyledInput
            id="fullname1"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.fullname1}
            onChange={handleChange}
          />
          {errors.fullname1 && <ErrorMessage>{errors.fullname1}</ErrorMessage>}
          <StyledLabel htmlFor="identity1">MSSV/CCCD:</StyledLabel>
          <StyledInput
            id="identity1"
            placeholder="MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd"
            value={formData.identity1}
            onChange={handleChange}
          />
          {errors.identity1 && <ErrorMessage>{errors.identity1}</ErrorMessage>}
          <StyledLabel htmlFor="phonenumber1">Số điện thoại:</StyledLabel>
          <StyledInput
            id="phonenumber1"
            placeholder="Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789"
            value={formData.phonenumber1}
            onChange={handleChange}
          />
          {errors.phonenumber1 && <ErrorMessage>{errors.phonenumber1}</ErrorMessage>}
          <StyledLabel htmlFor="school1">Tên trường:</StyledLabel>
          <StyledInput
            id="school1"
            placeholder="Ví dụ: Trường Đại học Công nghệ Thông tin"
            value={formData.school1}
            onChange={handleChange}
          />
          {errors.school1 && <ErrorMessage>{errors.school1}</ErrorMessage>}
        </FormSection>

        <Separator />

        {/* Phần nhập liệu cho thông tin thành viên 2 */}
        <FormSection>
          <Typography variant="h3" gutterBottom>
            Thành viên 2:
          </Typography>
          <StyledLabel htmlFor="fullname2">Họ và tên:</StyledLabel>
          <StyledInput
            id="fullname2"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.fullname2}
            onChange={handleChange}
          />
          {errors.fullname2 && <ErrorMessage>{errors.fullname2}</ErrorMessage>}
          <StyledLabel htmlFor="identity2">MSSV/CCCD:</StyledLabel>
          <StyledInput
            id="identity2"
            placeholder="MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd"
            value={formData.identity2}
            onChange={handleChange}
          />
          {errors.identity2 && <ErrorMessage>{errors.identity2}</ErrorMessage>}
          <StyledLabel htmlFor="phonenumber2">Số điện thoại:</StyledLabel>
          <StyledInput
            id="phonenumber2"
            placeholder="Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789"
            value={formData.phonenumber2}
            onChange={handleChange}
          />
          {errors.phonenumber2 && <ErrorMessage>{errors.phonenumber2}</ErrorMessage>}
          <StyledLabel htmlFor="school2">Tên trường:</StyledLabel>
          <StyledInput
            id="school2"
            placeholder="Ví dụ: Trường Đại học Công nghệ Thông tin"
            value={formData.school2}
            onChange={handleChange}
          />
          {errors.school2 && <ErrorMessage>{errors.school2}</ErrorMessage>}
        </FormSection>

        <Separator />

        {/* Phần nhập liệu cho thông tin thành viên 3 */}
        <FormSection>
          <Typography variant="h3" gutterBottom>
            Thành viên 3:
          </Typography>
          <StyledLabel htmlFor="fullname3">Họ và tên:</StyledLabel>
          <StyledInput
            id="fullname3"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.fullname3}
            onChange={handleChange}
          />
          {errors.fullname3 && <ErrorMessage>{errors.fullname3}</ErrorMessage>}
          <StyledLabel htmlFor="identity3">MSSV/CCCD:</StyledLabel>
          <StyledInput
            id="identity3"
            placeholder="MSSV bao gồm chữ hoặc số hoặc chữ và số. Ví dụ: 1234abcd"
            value={formData.identity3}
            onChange={handleChange}
          />
          {errors.identity3 && <ErrorMessage>{errors.identity3}</ErrorMessage>}
          <StyledLabel htmlFor="phonenumber3">Số điện thoại:</StyledLabel>
          <StyledInput
            id="phonenumber3"
            placeholder="Số điện thoại có 10 hoặc 11 chữ số. Ví dụ: 0123456789"
            value={formData.phonenumber3}
            onChange={handleChange}
          />
          {errors.phonenumber3 && <ErrorMessage>{errors.phonenumber3}</ErrorMessage>}
          <StyledLabel htmlFor="school3">Tên trường:</StyledLabel>
          <StyledInput
            id="school3"
            placeholder="Ví dụ: Trường Đại học Công nghệ Thông tin"
            value={formData.school3}
            onChange={handleChange}
          />
          {errors.school3 && <ErrorMessage>{errors.school3}</ErrorMessage>}
        </FormSection>

        <Separator />

        {/* Nút đăng ký đội */}
        <Box mt={3} display='flex' justifyContent='center'>
          <SignUpButton variant="contained" type="submit" onClick={handleSubmit}>
            Đăng kí đội
          </SignUpButton>
        </Box>
      </Wrapper>
    </Container>
  )
}

export default UserForm;
