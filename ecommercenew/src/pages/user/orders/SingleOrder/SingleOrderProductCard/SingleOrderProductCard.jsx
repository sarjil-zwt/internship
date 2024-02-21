import React from "react";
import "./SingleOrderProductCard.css";

const SingleOrderProductCard = ({ orderitem }) => {
  return (
    <div className="singleorderproductcard">
      <div className="singleorderproductcardimagediv">
        <img src={orderitem.Product.vImage} alt="" />
      </div>
      <div className="singleorderproductcarddetails">
        <p className="sopcdtitle">{orderitem.Product.vTitle}</p>
        <div className="sopcdprice">
          <p>X {orderitem.iQuantity}</p>
          <p>= </p>
          <p>{orderitem.iQuantity * orderitem.Product.fPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderProductCard;
