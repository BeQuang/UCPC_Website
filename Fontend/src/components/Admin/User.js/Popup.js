import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Popup = ({ title, openPopup, setOpenPopup, handleAction, actionType, children }) => {
    return (
        <Dialog open={openPopup} onClose={() => setOpenPopup(false)} fullWidth maxWidth='md'>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenPopup(false)} color='secondary'>Cancel</Button>
                <Button onClick={() => handleAction(actionType)} color='primary'>
                    {actionType === 'edit' ? 'Save' : 'Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
