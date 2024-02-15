import React, { useEffect, useState } from "react";
import "./Addresses.css";
import { AddCircleOutline } from "@mui/icons-material";
import AddAddressModal from "./AddAddressModal/AddAddressModal";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard/AddressCard";
import axios from "axios";
import { setAddressesState } from "../../../redux/features/addressSlice";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const Addresses = () => {
  const [addressModal, setAddressModal] = useState(false);
  const { addresses } = useSelector((state) => state.addressState);
  const dispatch = useDispatch();
  const [searchparams] = useSearchParams();

  useEffect(() => {
    axios
      .get("/addresses")
      .then((res) => {
        dispatch(setAddressesState(res.data.addresses));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
      });

    if (searchparams.get("open")) {
      setAddressModal(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="addressespage">
      <AddAddressModal open={addressModal} setOpen={setAddressModal} />
      <div className="addressespageheader">
        <h2>Saved Addresses</h2>
        <button className="addaddressbtn" onClick={() => setAddressModal(true)}>
          <AddCircleOutline />
          Add Address
        </button>
      </div>
      <div className="addresseswrapper">
        {addresses.map((address) => {
          return <AddressCard address={address} />;
        })}
      </div>
    </div>
  );
};

export default Addresses;
