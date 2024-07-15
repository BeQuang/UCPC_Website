import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Popup = ({ title, children, openPopup, setOpenPopup, onSubmit }) => {
  return (
    <Dialog open={openPopup} maxWidth="md" onClose={() => setOpenPopup(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {onSubmit && (
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)} color="secondary">Cancel</Button>
          <Button onClick={onSubmit} color="primary">Save</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Popup;
    