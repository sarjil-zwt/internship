import React from "react";
import "./SelectAddressCard.css";

const SelectAddressCard = ({ address }) => {
  return (
    <div className="selectaddresscard">
      <div className="sacheader">
        <p className="sachname">
          {address.vFirstname} {address.vLastname}
        </p>
        <p className="sachaddresstype">{address.eAddressType}</p>
        <p className="sacfphone">( {address.vPhone} )</p>
      </div>
      <div className="sacbody">
        <p className="sacbp">
          {address.vHouse}, {address.vArea}, {address.vCity}, {address.vState} -{" "}
          {address.vPincode}
        </p>
      </div>
      <div className="sacfooter"></div>
    </div>
  );
};

export default SelectAddressCard;
