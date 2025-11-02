import React from "react";
import { Stack } from "@mui/material";
import CustomCard from "./CustomCard";

const CustomCardList = ({ rows = [], columns = [], actions = [] }) => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={3}
      justifyContent="flex-start"
      sx={{ mt: 2 }}
    >
      {rows.map((row, index) => (
        <CustomCard 
            key={index} 
            data={row} 
            columns={columns} 
            actions={actions} 
            index={index}
        />
      ))}
    </Stack>
  );
};

export default CustomCardList;
