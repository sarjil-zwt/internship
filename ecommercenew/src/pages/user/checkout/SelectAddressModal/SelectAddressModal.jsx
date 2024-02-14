import React, { useEffect, useState } from "react";
import "./SelectAddressModal.css";
import Modal from "@mui/material/Modal";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import SelectAddressCard from "../SelectAddressCard/SelectAddressCard";

const SelectAddressModal = ({
  open,
  setOpen,
  addresses,
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
  addresstype,
}) => {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (addresstype == 1) {
      setSelected(shippingAddress.id);
    } else if (addresstype == 2) {
      setSelected(billingAddress.id);
    }
  }, [addresstype]);

  const handleChange = (a) => {
    setSelected(a.id);
    if (addresstype == 1) {
      setShippingAddress(a);
    } else if (addresstype == 2) {
      setBillingAddress(a);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="selectaddressmodal">
          <Typography component="h1" variant="h5">
            Select Address
          </Typography>

          <RadioGroup
            className="selectaddressmodaladdresswrapper"
            value={addresstype == 1 ? shippingAddress : billingAddress}
          >
            {addresses.map((a) => {
              return (
                <FormControlLabel
                  control={<Radio />}
                  value={a}
                  checked={selected == a.id}
                  onChange={(e) => handleChange(a)}
                  label={<SelectAddressCard address={a} />}
                />
              );
            })}
          </RadioGroup>
        </div>
      </Modal>
    </div>
  );
};

export default SelectAddressModal;
