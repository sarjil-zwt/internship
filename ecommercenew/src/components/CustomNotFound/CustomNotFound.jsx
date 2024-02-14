import React from "react";
import "./CustomNotFound.css";
import { ErrorOutline } from "@mui/icons-material";

const CustomNotFound = ({ message, size = "200px", fontSize = "50px" }) => {
  return (
    <div className="customnotfound">
      <ErrorOutline
        sx={{
          fontSize: size,
          color: "#ff6969",
        }}
      />
      <p style={{ fontSize: fontSize }}>{message}</p>
    </div>
  );
};

export default CustomNotFound;
