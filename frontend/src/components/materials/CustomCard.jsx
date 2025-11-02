import React from "react";
import { Card, CardContent, CardActions, Typography, Divider, Stack, IconButton } from "@mui/material";

const CustomCard = ({ data, columns, actions, index, sx }) => {
  // Fonction pour formater les dates
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois commence à 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <Card
      sx={{
        width: 350,
        p: 2,
        m: 1,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(23, 8, 20, 0.1)",
        background: "linear-gradient(145deg, #ffb9ddff, #f9f9f9)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      {/* Title with numbering */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom component="div">
          {index + 1}. {data.title || "No Title"}
        </Typography>

        <Divider sx={{ mb: 1 }} />

        {/* Details with column name + value */}
        <Stack spacing={1}>
          {columns
            .filter(col => col.field !== "title" && col.field !== "actions")
            .map((col, idx) => (
              <Typography
                key={idx}
                component="div"
                variant="body2"
                color="text.secondary"
              >
                <strong>{col.label}:</strong>
                <br />
                {["endDate", "createdAt"].includes(col.field)
                  ? formatDateTime(data[col.field]) : col.renderCell
                  ? col.renderCell(data) : data[col.field] || "-"}
              </Typography>
            ))}
        </Stack>
      </CardContent>

      {/* Actions aligned horizontally */}
      {actions && actions.length > 0 && (
        <>
          <Divider sx={{ mt: 1 }} />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            {actions.map((action, i) => (
              <IconButton key={i} color="primary" onClick={() => action.onClick(data)}>
                {action.icon}
              </IconButton>
            ))}
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default CustomCard;
