import React, { useEffect, useState } from "react";
import "./CartProductCard.css";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  setCartState,
  setQuantityOfCartProduct,
} from "../../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Delete } from "@mui/icons-material";

const CartProductCard = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    handleChange();
  }, [quantity]);

  const handleChange = async () => {
    await axios
      .put("/cart/product/setquantity", {
        product: item.Product.id,
        quantity,
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
        <img src={item.Product.image} className="ccimage" alt="" />
      </div>

      <div className="ccdetails">
        <Link to={`/product/${item.Product.id}`}>
          <p className="title">{item.Product.title}</p>
        </Link>
        <p className="ccprice">₹{item.Product.price}</p>
      </div>

      <div className="ccbuttons">
        <button
          className="ccquantitybtn"
          disabled={quantity <= 1}
          onClick={(e) => setQuantity((q) => q - 1)}
        >
          -
        </button>
        <input
          type="number"
          className="ccquantityinp"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          id=""
        />
        <button
          className="ccquantitybtn"
          onClick={(e) => setQuantity((q) => q + 1)}
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
