import React from 'react';
import { DialogActions, Button, Typography } from '@mui/material';

const ConfirmDeleteUser = ({ userId, onConfirm }) => {
    return (
        <div>
            <Typography variant="body1">Are you sure you want to delete user with ID: {userId}?</Typography>
            {/* <DialogActions>
                <Button onClick={() => onConfirm(userId)} color="secondary" variant="contained">
                    Confirm
                </Button>
                <Button onClick={() => onConfirm(null)} color="primary" variant="contained">
                    Cancel
                </Button>
            </DialogActions> */}
        </div>
    );
};

export default ConfirmDeleteUser;
