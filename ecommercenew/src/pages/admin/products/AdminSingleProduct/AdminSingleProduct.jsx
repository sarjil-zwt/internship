import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import Rating from "@mui/material/Rating";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Loader from "../../../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/features/cartSlice";
import toast from "react-hot-toast";

const AdminSingleProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/${params.id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success("Added to Cart");
    setQuantity(1);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="singleproduct">
      <div className="spimgdiv">
        <img src={product.image} alt="" className="spimg" />
      </div>
      <div className="spdetailsdiv">
        <div className="sphead">
          <h3 className="spproductname">{product.title}</h3>
          <div className="spratingsdiv">
            <p className="sprate">{product?.rating?.rate}</p>
            <Rating
              name="rating-read"
              value={product?.rating?.rate || 0}
              precision={0.1}
              readOnly
            />
            <p className="spratecount">{product?.rating?.count} ratings</p>
          </div>

          <div className="spmrpdiv">
            M.R.P. :<p className="spprice">₹{product.price}</p>
          </div>
        </div>

        <div className="spdescription">
          <p className="descriptionheading">About this item</p>
          <p className="spdescriptiontext">{product.description}</p>
        </div>

        <div className="spbuttons">
          <div className="spquantity">
            <button
              className="spquantitydecbtn"
              onClick={() => {
                setQuantity((q) => q - 1);
              }}
              disabled={quantity <= 1}
            >
              -
            </button>
            <p className="spquantitytxt">Quantity : {quantity}</p>
            <button
              className="spquantityincbtn"
              onClick={() => {
                setQuantity((q) => q + 1);
              }}
            >
              +
            </button>
          </div>

          <div className="spaddtocartbtndiv">
            <button className="spaddtocartbtn" onClick={handleAddToCart}>
              <ShoppingCartOutlined
                sx={{
                  fontWeight: "400",
                  fontSize: "20px",
                }}
              />
              Add to Cart - ₹{product.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleProduct;
