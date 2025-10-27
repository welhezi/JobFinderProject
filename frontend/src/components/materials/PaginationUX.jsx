import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

const PaginationUX = ({ count, pageNumber, onChange, color="primary", size="medium" }) => {
  return (
    <Box sx={{ marginTop: "20px"}}>
        <Stack spacing={2}>
        <Pagination 
            count={count}
            page={pageNumber || 1}   // Toujours défini pour éviter warning
            color={color}
            size={size}
            onChange={(e, page) => onChange(page)}  // MUI passe l'événement et le numéro de page
        />
        </Stack>
    </Box>
    
  );
}

export default PaginationUX;
