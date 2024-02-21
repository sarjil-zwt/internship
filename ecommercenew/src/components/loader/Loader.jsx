import { CircularProgress } from "@mui/material";
import React from "react";
import "./Loader.css";
import Lottie from "lottie-react";
import bird from "./bird.json";

const Loader = ({ size, position }) => {
  return (
    <div className="loader" style={{ position: position ? position : "fixed" }}>
      <Lottie animationData={bird} height="50px" className="loaderbird" />
      {/* <CircularProgress size={size} /> */}
    </div>
  );
};

export default Loader;
