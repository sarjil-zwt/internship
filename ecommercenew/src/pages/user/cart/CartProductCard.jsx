import React, { useEffect, useState } from "react";
import "./CartProductCard.css";
import { useDispatch } from "react-redux";
import { setCartState } from "../../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Delete } from "@mui/icons-material";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   handleChange();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [quantity]);

  const handleChange = async (quantity) => {
    await axios
      .put("/cart/product/setquantity", {
        iProductId: item.Product.id,
        iQuantity: quantity,
      })
      .then((res) => {
        dispatch(setCartState({ ...res.data.cart }));
      })
      .catch((err) => {
        toast.error("Error setting quantity of cart");
      });
  };

  const handleDelete = async () => {
    await axios
      .delete(`/cart/product/${item.Product.id}`)
      .then((res) => {
        console.log(res);
        dispatch(setCartState({ ...res.data.cart }));
        toast.success("Product Deleted from cart");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.message ||
            "Error deleting cartProduct please try after some time"
        );
      });
  };

  return (
    <div className="cartcard">
      <div className="ccimgwrapper">
        <img src={item.Product.vImage} className="ccimage" alt="" />
      </div>

      <div className="ccdetails">
        <Link to={`/product/${item.Product.id}`}>
          <p className="title">{item.Product.vTitle}</p>
        </Link>
        <p className="ccprice">₹{item.Product.fPrice}</p>
      </div>

      <div className="ccbuttons">
        <button
          className="ccquantitybtn"
          disabled={item.iQuantity <= 1}
          onClick={() => handleChange(item.iQuantity - 1)}
        >
          -
        </button>
        <input
          type="number"
          className="ccquantityinp"
          value={item.iQuantity}
          onChange={(e) => handleChange(e.target.value)}
          id=""
        />
        <button
          className="ccquantitybtn"
          onClick={() => handleChange(item.iQuantity + 1)}
        >
          +
        </button>
      </div>
      <Delete
        sx={{
          color: "#ff5e5e",
          transition: "0.2s all",
          "&: hover": {
            color: "#e35454",
          },
          cursor: "pointer",
        }}
        onClick={handleDelete}
      />
    </div>
  );
};

export default CartProductCard;
