import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import Rating from "@mui/material/Rating";
import {
  ExpandLess,
  ExpandMore,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Loader from "../../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/features/cartSlice";
import toast from "react-hot-toast";
import AddReviewModal from "./AddReviewModal/AddReviewModal";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import ReviewCard from "./ReviewCard/ReviewCard";
import { setSingleProductState } from "../../../../redux/features/singleProductSlice";
import ReviewsBarChart from "./ReviewsBarChart/ReviewsBarChart";

const SingleProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.singleProduct);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewDisplayLength, setReviewDisplayLength] = useState(3);

  useEffect(() => {
    loadProduct();
    // loadReviews();
  }, []);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/products/${params.id}`);
      // console.log(res.data);
      // setProduct(res.data.product);
      dispatch(setSingleProductState(res.data.product));
      // loadReviews(res.data.product.id); // Pass product ID to loadReviews
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    // console.log(product.id, "***product");
    await axios
      .post("/cart/product/add", {
        iProductId: product.id,
        iQuantity: quantity,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(addToCart({ ...res.data.cart }));
      });
    toast.success("Added to Cart");
    setQuantity(1);
  };

  //Percentage logic

  return (
    <div className="singleproduct">
      {loading && <Loader />}
      <AddReviewModal
        open={reviewModal}
        setOpen={setReviewModal}
        pId={product.id}
      />
      <div className="spimgdiv">
        <img src={product.vImage} alt="" className="spimg" />
      </div>
      <div className="spdetailsdiv">
        <div className="spdetailsdivhead">
          <h3 className="">{product.vTitle}</h3>
          <div className="spratingsdiv">
            <Rating
              name="rating-read"
              value={
                product?.fRatings
                  ? +parseFloat(product?.fRatings).toFixed(2)
                  : 0
              }
              precision={0.1}
              readOnly
            />
            <p className="sprate">
              <span>{product?.fRatings?.toFixed(2)}</span> / 5
            </p>
            <p className="spratecount">{product?.rating?.count} ratings</p>
          </div>

          <div className="spmrpdiv">
            M.R.P. :<p className="spprice">₹{product.fPrice}</p>
          </div>
        </div>

        <div className="spdescription">
          <p className="spsubheading">About this item</p>
          <p className="spdescriptiontext">{product.tDescription}</p>
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
              Add to Cart - ₹{product.fPrice * quantity}
            </button>
          </div>
        </div>
        <div className="spreviewsdiv">
          <div className="spreviewsheadingdiv">
            <p className="spsubheading">Reviews</p>
            <button
              className="spraddreviewbutton"
              onClick={() => setReviewModal(true)}
            >
              Add Review
            </button>
          </div>

          {product?.Reviews?.length > 0 && <ReviewsBarChart />}
          <div className="reviewswrapper">
            {product?.Reviews?.length > 0 ? (
              <div className="reviewcardswrapper">
                {(product?.Reviews).slice(0, reviewDisplayLength).map((r) => {
                  // console.log(r);
                  return <ReviewCard review={r} key={r.id} />;
                })}
              </div>
            ) : (
              <CustomNotFound
                message={"No reviews yet!!"}
                size="100px"
                fontSize="40px"
              />
            )}
            <div className="reviewsdivendbuttons">
              {product?.Reviews?.length > reviewDisplayLength && (
                <button
                  className="sprloadmore"
                  onClick={() => setReviewDisplayLength((l) => l + 3)}
                >
                  Load More <ExpandMore />
                </button>
              )}
              {reviewDisplayLength > 3 && (
                <button
                  className="sprloadmore"
                  onClick={() => setReviewDisplayLength(3)}
                >
                  Show Less <ExpandLess />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
