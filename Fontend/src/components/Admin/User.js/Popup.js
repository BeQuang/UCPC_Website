import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

const Popup = ({ title, openPopup, setOpenPopup, handleAction, actionType, children }) => {
    const getActionButtonText = () => {
        switch (actionType) {
            case 'edit':
                return 'Save';
            case 'reset':
                return 'Reset';
            case 'delete':
                return 'Delete';
            default:
                return 'Confirm';
        }
    };

    const getButtonColor = () => {
        switch (actionType) {
            case 'edit':
                return 'green';
            case 'reset':
                return 'blue';
            case 'delete':
                return 'blue';
            default:
                return 'grey';
        }
    };

    const getButtonHoverColor = () => {
        switch (actionType) {
            case 'edit':
                return 'darkgreen';
            case 'reset':
                return 'darkblue';
            case 'delete':
                return 'darkblue';
            default:
                return 'darkgrey';
        }
    };

    return (
        <Dialog open={openPopup} onClose={() => setOpenPopup(false)} fullWidth maxWidth='md'>
            <DialogTitle sx={{backgroundColor: '#d3d3d3', fontSize: '50px', textAlign: 'center', marginBottom: '10px', padding: '0px 20px 0px 0px', color: '#4a2882'}}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <Box sx={{ backgroundColor: '#f0f0f0', paddingTop: '5px' }}>
                <DialogActions>
                    <Button 
                        onClick={() => setOpenPopup(false)} 
                        sx={{ 
                            backgroundColor: 'red', 
                            color: 'white', 
                            marginRight: '10px',
                            '&:hover': {
                                backgroundColor: 'darkred'
                            } 
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => handleAction(actionType)} 
                        sx={{ 
                            backgroundColor: getButtonColor(), 
                            color: 'white', 
                            marginRight: '15px',
                            '&:hover': {
                                backgroundColor: getButtonHoverColor()
                            } 
                        }}
                    >
                        {getActionButtonText()}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default Popup;
