import { Box, Button, Typography, Divider, InputBase } from '@mui/material';
import { styled } from '@mui/system';

// Định nghĩa màu chính và màu đen để sử dụng trong các component styled
export const primaryColor = '#4a2882';
export const blackColor = '#000';

// Component Wrapper với kiểu dáng được áp dụng sử dụng Box của MUI và styled utility
export const Wrapper = styled(Box)(({ theme }) => ({
     maxWidth: '100vh',             // Chiều rộng tối đa được đặt là 100vh (chiều cao của viewport)
     margin: '0 auto',              // Canh giữa theo chiều ngang
     padding: '20px 0',             // Đệm theo chiều dọc
     border: '1px solid #ccc',      // Viền màu xám nhạt
     borderRadius: '20px',          // Bo góc
     backgroundColor: '#ffffff',    // Màu nền trắng
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // Đổ bóng nhẹ tạo hiệu ứng nâng cao
}));

// Component Title cho tiêu đề của form, được styled sử dụng Typography của MUI
export const Title = styled(Typography)({
     textAlign: 'right',            // Canh phải cho văn bản
     marginBottom: '10px',          // Khoảng cách dưới của tiêu đề
     marginRight: '20px',           // Khoảng cách phải để tạo khoảng cách
     color: primaryColor,           // Màu chính đã được định nghĩa trước đó
     fontWeight: 'bold'             // Độ đậm của chữ
});

// Component FormSection để bao quanh mỗi phần của form
export const FormSection = styled(Box)({
     display: 'block',              // Hiển thị dạng khối
     marginBottom: '10px',          // Khoảng cách dưới mỗi phần
     paddingBottom: '10px',         // Đệm dưới mỗi phần
     marginLeft: '40px',            // Khoảng cách trái để tạo khoảng cách
});

// Component Separator để tạo đường phân cách giữa các phần của form, sử dụng Divider của MUI
export const Separator = styled(Divider)({
     display: 'block',              // Hiển thị dạng khối
     width: '100%',                 // Chiều rộng 100%
     height: '3px',                 // Chiều cao 3px
     backgroundColor: primaryColor, // Màu nền là màu chính
     marginBottom: '20px',          // Khoảng cách dưới của đường phân cách
});

// Component StyledLabel để tạo nhãn cho các input, sử dụng thẻ 'label'
export const StyledLabel = styled('label')({
     display: 'block',              // Hiển thị dạng khối
     marginBottom: '8px',           // Khoảng cách dưới của nhãn
     fontWeight: 'bold',            // Độ đậm của chữ
     fontSize: '2.5rem',            // Kích thước chữ lớn
     color: primaryColor,           // Màu chính
     marginLeft: '20px',            // Khoảng cách trái để tạo khoảng cách
});

// Component StyledInput để tạo các ô nhập liệu, sử dụng InputBase của MUI
export const StyledInput = styled(InputBase)({
     width: '70%',                  // Chiều rộng 70%
     marginBottom: '12px',          // Khoảng cách dưới của ô nhập liệu
     padding: '8px',                // Đệm bên trong ô nhập liệu
     border: `2px solid ${primaryColor}`, // Viền 2px với màu chính
     borderRadius: '10px',          // Bo góc
     boxSizing: 'border-box',       // Đảm bảo tính toán kích thước bao gồm cả viền và đệm
     marginLeft: '20px',            // Khoảng cách trái để tạo khoảng cách
     '& .MuiInputBase-input': {
          width: '100%',            // Chiều rộng 100% cho phần input bên trong
          fontSize: '1.5rem',       // Kích thước chữ 1.5rem
     },
});

// Component ErrorMessage để hiển thị thông báo lỗi, sử dụng Typography của MUI
export const ErrorMessage = styled(Typography)({
     color: 'red',                  // Màu chữ đỏ
     marginLeft: '20px',            // Khoảng cách trái để tạo khoảng cách
     fontSize: '2rem',              // Kích thước chữ 2rem
     marginBottom: '12px',          // Khoảng cách dưới của thông báo lỗi
});

// Component SignUpButton để tạo nút đăng ký, sử dụng Button của MUI
export const SignUpButton = styled(Button)({
     display: 'block',              // Hiển thị dạng khối
     width: '40%',                  // Chiều rộng 40%
     padding: '10px',               // Đệm bên trong nút
     backgroundColor: primaryColor, // Màu nền là màu chính
     color: '#fff',                 // Màu chữ trắng
     border: 'none',                // Không viền
     borderRadius: '4px',           // Bo góc
     cursor: 'pointer',             // Con trỏ chuột dạng pointer khi hover
     fontSize: '16px',              // Kích thước chữ 16px
     marginTop: '10px',             // Khoảng cách trên của nút
     '&:hover': {
          backgroundColor: `${primaryColor}cc`, // Làm tối màu chính khi hover bằng cách thêm độ mờ
     },
});
