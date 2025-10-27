import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip, IconButton } from '@mui/material';

const CustomTable = ({ rows, columns, actions }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="custom table">
        {/* ==== Table Header ==== */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field} align="center">
                {col.label}
              </TableCell>
            ))}

            {actions?.length > 0 && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>

        {/* ==== Table Body ==== */}
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((col) => (
                <TableCell key={col.field} align="center">
                   {col.renderCell ? col.renderCell(row) : row[col.field]}
                </TableCell>
              ))}

              {actions?.length > 0 && (
                <TableCell align="center">
                  {actions.map((action, i) => (
                    <Tooltip key={i} title={action.tooltip || ""}>
                      <IconButton onClick={() => action.onClick?.(row)}>
                        {action.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { CustomTable };
