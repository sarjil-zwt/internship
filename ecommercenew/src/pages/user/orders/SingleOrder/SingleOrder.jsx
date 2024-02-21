import React, { useEffect, useLayoutEffect, useState } from "react";
import "./SingleOrder.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";
import SingleOrderProductCard from "./SingleOrderProductCard/SingleOrderProductCard";
import { Divider } from "@mui/material";
import moment from "moment";

const SingleOrder = () => {
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/orders/order/${params.id}`)
      .then((res) => {
        setOrder(res.data.order);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong");
        navigate(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDownloadInvoice = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/orders/invoice/${order.id}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      setLoading(false);
    }
  };

  return (
    <div className="singleorderpage">
      {loading && <Loader />}
      <div className="singleorderpageheader">
        <p className="soph">Order Id - #{order?.id}</p>
        <p className="soph">
          Order Date - {moment(order?.createdAt).format("ll")}
        </p>
      </div>
      <div className="singleorderpagemiddle">
        <div className="sopmproductswrapepr">
          {order?.OrderItems?.map((oi) => {
            return <SingleOrderProductCard orderitem={oi} />;
          })}
        </div>
        <div className="singleorderpagemiddletotal">
          <p>
            Total -<span>₹{order?.fTotal - order?.fTotalTax}</span>
          </p>
          <p>
            Total tax -<span>₹{order?.fTotalTax}</span>
          </p>

          <p>
            Discount Applied -{" "}
            <span>
              {order?.fDiscount}% ( ₹
              {(order?.fTotal - order?.fDiscounted).toFixed(2)} )
            </span>
          </p>
          <Divider sx={{ width: "55%", position: "relative", left: "2%" }} />
          <p>
            <p></p>
            <span>₹{order?.fDiscounted}</span>
          </p>
          <p>
            Selected Shipping -
            <span>
              {order?.ShippingType?.vName} (₹{order?.ShippingType?.fCharge})
            </span>
          </p>

          <Divider sx={{ width: "55%", position: "relative", left: "2%" }} />
          <p>
            Grand Total - <span>₹{order?.fGrandTotal}</span>
          </p>
          <p>
            Payment Status - <span>{order?.vPaymentStatus}</span>
          </p>
          <p>
            Payment Id - <span>{order?.vPaymentId}</span>
          </p>
        </div>
      </div>

      <div className="singleorderpagemiddledetailswrapper">
        <div className="singleorderpagemiddledetails">
          <p className="sopmdaddresstitle">Shipping Address</p>
          <div className="sopmdaddressdetails">
            <p>
              {order?.shippingAddress?.vFirstname}{" "}
              {order?.shippingAddress?.vLastname},
            </p>
            <p>{order?.shippingAddress?.vPhone},</p>
            <p>{order?.shippingAddress?.vHouse},</p>
            <p>{order?.shippingAddress?.vArea},</p>
            <p>{order?.shippingAddress?.vCity},</p>
            <p>{order?.shippingAddress?.vState},</p>
            <p>{order?.shippingAddress?.vPincode}</p>
          </div>
        </div>
        <div className="singleorderpagemiddledetails">
          <p className="sopmdaddresstitle">Billing Address</p>
          <div className="sopmdaddressdetails">
            <p>
              {order?.billingAddress?.vFirstname}{" "}
              {order?.billingAddress?.vLastname},
            </p>
            <p>{order?.billingAddress?.vPhone},</p>
            <p>{order?.billingAddress?.vHouse},</p>
            <p>{order?.billingAddress?.vArea},</p>
            <p>{order?.billingAddress?.vCity},</p>
            <p>{order?.billingAddress?.vState},</p>
            <p>{order?.billingAddress?.vPincode}</p>
          </div>
        </div>
      </div>

      <div className="singleorderpagefooter">
        <button className="downloadinvoicebtn" onClick={handleDownloadInvoice}>
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default SingleOrder;
