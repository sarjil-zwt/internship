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
    <Link to={`/product/${product.id}`} className="productcard">
      <div
        className="pcimgdiv"
        style={{ backgroundImage: `url(${product.vImage})` }}
      >
        {/* <img className='productcardimg' src={product.image} alt="" /> */}
        {product?.Reviews?.length > 0 && (
          <div className="pcratings">
            <p className="pcrate">{product?.fRatings?.toFixed(2)}</p>

            <Star
              sx={{
                color: "#14958f",
                margin: 0,
                fontSize: "20px",
              }}
            />

            <p className="pcproductsaperator">|</p>

            <p className="pccount">{product?.Reviews?.length}</p>
          </div>
        )}
      </div>

      <p className="pctitle">{product?.vTitle}</p>
      <p className="pcdescription">{product?.tDescription}</p>
      <p className="pcprice">₹{product?.fPrice}</p>
    </Link>
  );
};

export default ProductCard;
