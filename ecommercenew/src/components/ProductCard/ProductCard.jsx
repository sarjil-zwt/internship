import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import "./ProductCard.css";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const userState = useSelector((state) => state.userState);
  return (
    <Link
      to={
        userState.userState.role == "admin"
          ? `/admin/product/${product.id}`
          : `/product/${product.id}`
      }
      className="productcard"
    >
      <div
        className="pcimgdiv"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        {/* <img className='productcardimg' src={product.image} alt="" /> */}
        <div className="pcratings">
          <p className="pcrate">{product?.rating?.rate}</p>

          <Star
            sx={{
              color: "#14958f",
              margin: 0,
              fontSize: "20px",
            }}
          />

          <p className="pcproductsaperator">|</p>

          <p className="pccount">{product?.rating?.count}</p>
        </div>
      </div>

      <p className="pctitle">{product?.title}</p>
      <p className="pcdescription">{product?.description}</p>
      <p className="pcprice">₹{product?.price}</p>
    </Link>
  );
};

export default ProductCard;
