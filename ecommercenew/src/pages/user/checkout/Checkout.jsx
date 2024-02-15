import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentComponent from "./StripePaymentComponent/StripePaymentComponent";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import SelectAddressCard from "./SelectAddressCard/SelectAddressCard";
import SelectAddressModal from "./SelectAddressModal/SelectAddressModal";
import { Close, CopyAllOutlined, DoneAllOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const addressState = useSelector((state) => state.addressState);
  const [selectAddressModal, setSelectAddressModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [addresstype, setAddressType] = useState(-1);
  const [cardnumber] = useState("4000003560000008");
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    setShippingAddress(addressState.addresses[0]);
    setBillingAddress(addressState.addresses[0]);
  }, [addressState]);

  const handleCheckboxChange = () => {
    setSameAsShipping((sameAsShipping) => !sameAsShipping);
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  };
  const handleMenuOpen = (addresstype) => {
    setAddressType(addresstype);
    setSelectAddressModal(true);
  };

  console.log(addressState);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCopied(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="checkout">
      {addressState?.addresses && (
        <SelectAddressModal
          open={selectAddressModal}
          setOpen={setSelectAddressModal}
          addresses={addressState?.addresses}
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          billingAddress={billingAddress}
          setBillingAddress={setBillingAddress}
          addresstype={addresstype}
        />
      )}

      <div className="cardcredentials">
        <Button
          id="basic-button"
          sx={{
            color: "gray",
            position: "absolute",
            top: "0px",
            right: "0px",
            ":& hover": {
              backgroundColor: "gray",
            },
          }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Card Number
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Close onClick={handleClose} />
            {
              <Typography
                onClick={() => {
                  navigator.clipboard.writeText(cardnumber);
                  setCopied(true);
                  // handleClose();
                }}
              >
                {cardnumber}
              </Typography>
            }{" "}
            {copied ? (
              <DoneAllOutlined color="success" />
            ) : (
              <CopyAllOutlined color="primary" />
            )}
          </MenuItem>
        </Menu>
      </div>
      <div className="checkoutwrapper">
        <div className="addressselectwrapper">
          <div className="addressselect">
            <div className="addressselectheader">
              <p>Select Shipping Address:</p>

              <div className="cpaddressbuttons">
                <button
                  onClick={() => {
                    navigate(
                      "/profile/addresses?redirect=profile/checkout&open=true"
                    );
                  }}
                  className="ashchangebtn"
                >
                  Add Address
                </button>
                {addressState.addresses.length >= 2 && (
                  <button
                    onClick={() => handleMenuOpen(1)}
                    className="ashchangebtn"
                  >
                    Change Address
                  </button>
                )}
              </div>
            </div>

            <RadioGroup className="addressesradiogrp">
              {shippingAddress && (
                <FormControlLabel
                  control={<Radio />}
                  checked={true}
                  label={<SelectAddressCard address={shippingAddress} />}
                />
              )}
            </RadioGroup>
          </div>
          <div className="addressselect">
            <div className="addressselectheader">
              <p>Select Billing Address:</p>

              {!sameAsShipping && (
                <div className="cpaddressbuttons">
                  <button
                    onClick={() => handleMenuOpen(1)}
                    className="ashchangebtn"
                  >
                    Add Address
                  </button>
                  {addressState.addresses.length >= 2 && (
                    <button
                      onClick={() => handleMenuOpen(1)}
                      className="ashchangebtn"
                    >
                      Change Address
                    </button>
                  )}
                </div>
              )}
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsShipping}
                  onChange={handleCheckboxChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              sx={{
                width: "fit-content",
              }}
              label="Same as Shipping address"
            />

            {!sameAsShipping && (
              <RadioGroup className="addressesradiogrp">
                {shippingAddress && (
                  <FormControlLabel
                    control={<Radio />}
                    checked={true}
                    label={<SelectAddressCard address={billingAddress} />}
                  />
                )}
              </RadioGroup>
            )}
          </div>
        </div>
        <Elements
          stripe={loadStripe(
            "pk_test_51OgiXySF7soF3JJNDPGMmoVuiO2rwUsb4uX8lTc0d72YA9fRx0SJW3VQSMlrbwxrS2eS79eQbz9rxyrBQUbYMoS700XPZ2Fv7A"
          )}
          className="checkoutpaymentelements"
        >
          <StripePaymentComponent
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
