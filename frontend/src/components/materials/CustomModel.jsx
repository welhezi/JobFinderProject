import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CustomModel = ({ open, handleClose, title, children, icon }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>{icon}</Grid>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        </Grid>

        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModel;
