import { Box, Button, Typography, Divider, InputBase } from '@mui/material';
import { styled } from '@mui/system';

export const primaryColor = '#4a2882';
export const blackColor = '#000';

export const Wrapper = styled(Box)(({ theme }) => ({
     maxWidth: '100vh',
     margin: '0 auto',
     padding: '20px 0',
     border: '1px solid #ccc',
     borderRadius: '20px',
     backgroundColor: '#ffffff',
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

export const Title = styled(Typography)({
     textAlign: 'right',
     marginBottom: '10px',
     marginRight: '20px',
     color: primaryColor,
     fontWeight: 'bold'
});

export const FormSection = styled(Box)({
     display: 'block',
     marginBottom: '10px',
     paddingBottom: '10px',
     marginLeft: '40px',
});

export const Separator = styled(Divider)({
     display: 'block',
     width: '100%',
     height: '3px',
     backgroundColor: primaryColor,
     marginBottom: '20px',
});

export const StyledLabel = styled('label')({
     display: 'block',
     marginBottom: '8px',
     fontWeight: 'bold',
     fontSize: '2.5rem',
     color: primaryColor,
     marginLeft: '20px',
});

export const StyledInput = styled(InputBase)({
     width: '70%',
     marginBottom: '12px',
     padding: '8px',
     border: `2px solid ${primaryColor}`,
     borderRadius: '10px',
     boxSizing: 'border-box',
     marginLeft: '20px',
     '& .MuiInputBase-input': {
          width: '100%',
          fontSize: '1.5rem',
     },
});

export const ErrorMessage = styled(Typography)({
     color: 'red',
     marginLeft: '20px',
     fontSize: '2rem',
     marginBottom: '12px',
});

export const SignUpButton = styled(Button)({
     display: 'block',
     width: '40%',
     padding: '10px',
     backgroundColor: primaryColor,
     color: '#fff',
     border: 'none',
     borderRadius: '4px',
     cursor: 'pointer',
     fontSize: '16px',
     marginTop: '10px',
     '&:hover': {
          backgroundColor: `${primaryColor}cc`, // Darken the primary color by adding opacity
     },
});
