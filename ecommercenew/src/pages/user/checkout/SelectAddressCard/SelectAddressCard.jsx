import React from "react";
import "./SelectAddressCard.css";

const SelectAddressCard = ({ address }) => {
  return (
    <div className="selectaddresscard">
      <div className="sacheader">
        <p className="sachname">{address.fullname}</p>
        <p className="sachaddresstype">{address.addresstype}</p>
        <p className="sacfphone">( {address.phone} )</p>
      </div>
      <div className="sacbody">
        <p className="sacbp">
          {address.house},{address.area},{address.city},{address.state}-
          {address.pincode}
        </p>
      </div>
      <div className="sacfooter"></div>
    </div>
  );
};

export default SelectAddressCard;
