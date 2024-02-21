import React from "react";
import "./OrderCard.css";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <Link to={`/profile/orders/${order.id}`} className="ordercard">
      <div className="ordercardimagediv">
        <img
          src={order.OrderItems[0].Product.vImage}
          alt=""
          className="ordercardimage"
        />
      </div>
      <div className="ordercarddetails">
        <div className="ocdproductlist">
          {order.OrderItems.map((oi) => {
            return (
              <p>
                {oi.Product.vTitle} x {oi.iQuantity}
              </p>
            );
          })}
        </div>

        <div className="totoaldisplay">
          <p>Total - ₹{order.fTotal}</p>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
