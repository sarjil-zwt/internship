import React from "react";
import "./NotFound404.css";
import Lottie from "lottie-react";
import notfoundAnimation from "./notfoundAnimation.json";

const NotFound404 = () => {
  return (
    <div className="notfoundpage">
      <Lottie animationData={notfoundAnimation} className="animation" />
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFound404;
