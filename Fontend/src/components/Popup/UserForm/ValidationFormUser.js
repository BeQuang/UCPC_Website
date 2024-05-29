export const validateFormUser = (formData, setErrors) => {
     let tempErrors = {};
     // Biểu thức chính quy để kiểm tra định dạng email
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     // Biểu thức chính quy để kiểm tra định dạng số điện thoại (10-11 chữ số)
     const phonePattern = /^[0-9]{10,11}$/;
     // Biểu thức chính quy để kiểm tra định dạng MSSV/CCCD (chỉ bao gồm chữ và số)
     const identityPattern = /^[a-zA-Z0-9]+$/;

     // Kiểm tra trường tên đội
     if (!formData.nameofteam) tempErrors.nameofteam = 'Tên đội là bắt buộc.';
     // Kiểm tra trường email và định dạng email
     if (!formData.email || !emailPattern.test(formData.email)) tempErrors.email = 'Email không hợp lệ.';
     
     // Kiểm tra các trường thông tin của thành viên 1
     if (!formData.fullname1) tempErrors.fullname1 = 'Họ và tên là bắt buộc.';
     if (!formData.identity1 || !identityPattern.test(formData.identity1)) tempErrors.identity1 = 'MSSV/CCCD không hợp lệ.';
     if (!formData.phonenumber1 || !phonePattern.test(formData.phonenumber1)) tempErrors.phonenumber1 = 'Số điện thoại không hợp lệ.';
     if (!formData.school1) tempErrors.school1 = 'Tên trường là bắt buộc.';

     // Kiểm tra các trường thông tin của thành viên 2
     if (!formData.fullname2) tempErrors.fullname2 = 'Họ và tên là bắt buộc.';
     if (!formData.identity2 || !identityPattern.test(formData.identity2)) tempErrors.identity2 = 'MSSV/CCCD không hợp lệ.';
     if (!formData.phonenumber2 || !phonePattern.test(formData.phonenumber2)) tempErrors.phonenumber2 = 'Số điện thoại không hợp lệ.';
     if (!formData.school2) tempErrors.school2 = 'Tên trường là bắt buộc.';

     // Kiểm tra các trường thông tin của thành viên 3
     if (!formData.fullname3) tempErrors.fullname3 = 'Họ và tên là bắt buộc.';
     if (!formData.identity3 || !identityPattern.test(formData.identity3)) tempErrors.identity3 = 'MSSV/CCCD không hợp lệ.';
     if (!formData.phonenumber3 || !phonePattern.test(formData.phonenumber3)) tempErrors.phonenumber3 = 'Số điện thoại không hợp lệ.';
     if (!formData.school3) tempErrors.school3 = 'Tên trường là bắt buộc.';

     // Cập nhật trạng thái lỗi
     setErrors(tempErrors);

     // Trả về true nếu không có lỗi, ngược lại trả về false
     return Object.keys(tempErrors).length === 0;
}