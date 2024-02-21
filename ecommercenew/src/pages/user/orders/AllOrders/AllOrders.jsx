import React from "react";
import "./AllOrders.css";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard/OrderCard";

const AllOrders = () => {
  const ordersState = useSelector((state) => state.ordersState);
  return (
    <div className="allordersdiv">
      <div className="orderswrapper">
        {ordersState.orders.map((order) => {
          return <OrderCard order={order} />;
        })}
      </div>
    </div>
  );
};

export default AllOrders;
