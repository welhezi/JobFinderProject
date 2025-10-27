import React from 'react';
import { Modal, Box, IconButton, Typography,  Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { CustomButton } from './CustomButton';


const styleDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:"auto",
    height: "auto",
    bgcolor: '#FFF4F4',
    boxShadow: 10,
    borderRadius: '10px',
    p:3,
  };

const DeleteModal = ({ open, handleClose, onConfirm, title }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={styleDelete}>
        <IconButton
  aria-label="close"
  onClick={handleClose}
  style={{
    position: 'absolute',
    right: -7,
    top: -7,
    backgroundColor: '#F9E5E4',
    color: "red",
  }}>
  <CloseIcon />
</IconButton>

        <Typography style={{ textAlign: "center", color: "red", fontSize: 18 }}>
          {title || "Are you sure you want to delete this post?"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <CustomButton title="Cancel" color="#ccc" onClick={handleClose} />
          <CustomButton title="Delete" color="red" onClick={onConfirm} />
        </Box>
      </Box>
    </Modal>
  );
};


export default DeleteModal