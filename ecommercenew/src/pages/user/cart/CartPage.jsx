import React, { useEffect, useLayoutEffect, useState } from "react";
import CartProductCard from "./CartProductCard";
import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import {
  setCartDiscount,
  setCartState,
} from "../../../redux/features/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import CustomNotFound from "../../../components/CustomNotFound/CustomNotFound";
import Loader from "../../../components/loader/Loader";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cartState);
  console.log(cart);
  const [couponcode, setCouponcode] = useState("");
  const [shippingTypes, setShippingTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  // console.log(cartState)

  const handleShippingChange = async (e) => {
    setLoading(true);
    await axios
      .post("/cart/shipping/change", {
        iShippingid: e.target.value,
      })
      .then((res) => {
        dispatch(setCartState({ ...res.data.cart }));
      })
      .catch((err) => {
        console.log(err);
        toast(err?.response?.data.message || "Something went wrong!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadShippingTypes();
    // loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadShippingTypes = async () => {
    setLoading(true);
    await axios
      .get("/shippingtypes")
      .then((res) => {
        setShippingTypes(res.data.shippingTypes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const loadCart = async () => {
    setLoading(true);
    await axios
      .get("/cart")
      .then((res) => {
        dispatch(setCartState({ ...res.data.cart }));
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error getting cart");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleApplyDiscountCoupon = async (e) => {
    setLoading(true);
    await axios
      .post("/cart/discount/add", {
        discountCode: couponcode,
      })
      .then((res) => {
        console.log(res.data);
        setCouponcode("");
        dispatch(setCartDiscount({ ...res.data.cart }));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Error adding discount");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveDiscount = async () => {
    setLoading(true);
    await axios
      .delete("/cart/discount/remove")
      .then((res) => {
        toast.success(res.data.message);
        dispatch(setCartState(res.data.cart));
      })
      .catch((err) => {
        toast.success(err.response.data.message || "Something went wrong!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="cartpage">
      <div className="cartpagewrapper">
        {loading && <Loader />}
        <div className="cpcartitems">
          {cart?.CartItems?.length > 0
            ? cart?.CartItems?.map((item) => {
                return <CartProductCard item={item} />;
              })
            : !loading && <CustomNotFound message="No Products in cart" />}
        </div>

        {cart?.CartItems?.length > 0 ? (
          <div className="cartpagesummarydiv">
            <h3 className="cpsummarytitle">Summary</h3>

            <div className="cpstotal">
              <p className="cpstotalitem">Items {cart?.CartItems?.length}</p>
              <p className="cpstotalamount">
                ₹{cart?.fTotal?.toFixed(2) - cart?.fTotalTax?.toFixed(2)}
              </p>
            </div>
            <div className="cpstotal">
              <p className="cpstotalitem">Tax - </p>
              <p className="cpstotalamount">₹{cart?.fTotalTax?.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cpstotal">
              <p className="cpstotalitem">Total - </p>
              <p className="cpstotalamount">₹{cart?.fTotal?.toFixed(2)}</p>
            </div>

            <div className="cpsinputdiv">
              <label htmlFor="">Coupon Code ( Optional )</label>
              <div className="cpsinputcpndiv">
                <input
                  type="text"
                  className="cpscoupon"
                  value={couponcode}
                  onChange={(e) => setCouponcode(e.target.value)}
                />
                <button
                  className="cpsapplycouponbtn"
                  onClick={(e) => handleApplyDiscountCoupon(e)}
                >
                  Apply
                </button>
              </div>
              {cart.fDiscount > 0 ? (
                <p className="cpsdiscountindicatortext">
                  Discount code added - {cart.fDiscount}% ( ₹
                  {((cart.fDiscount * cart.fTotal) / 100).toFixed(2)} )
                  <Delete
                    onClick={handleRemoveDiscount}
                    sx={{
                      color: "#ff5e5e",
                      height: "17px",
                      transition: "0.2s all",
                      "&: hover": {
                        color: "#e35454",
                      },
                      cursor: "pointer",
                    }}
                  >
                    x
                  </Delete>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="cpsinputdiv">
              <label htmlFor="">Shipping</label>
              <select
                name="shipping"
                id=""
                onChange={(e) => handleShippingChange(e)}
                value={cart.iShippingTypeId}
              >
                {shippingTypes.map((st) => {
                  return (
                    <option value={st.id} key={st.id}>
                      {st.vName} - ₹{st.fCharge}
                    </option>
                  );
                })}
              </select>
            </div>
            <hr />
            <div className="cpstotal">
              <p className="cpstotalitem">GRAND TOTAL</p>
              <p className="cpstotalamount">₹{cart.fGrandTotal}</p>
            </div>

            <Link to="/profile/checkout" className="cpscheckout">
              Checkout
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CartPage;
