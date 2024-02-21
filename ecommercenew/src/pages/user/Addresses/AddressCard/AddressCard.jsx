import React, { useState } from "react";
import "./AddressCard.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import EditAddressModal from "../EditAddressModal/EditAddressModal";
import Loader from "../../../../components/loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../../../redux/features/addressSlice";

const AddressCard = ({ address }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await axios
      .delete(`/addresses/${address.id}`)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(deleteAddress(address.id));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
      });
  };
  return (
    <div className="addresscard">
      <EditAddressModal
        open={addressModal}
        setOpen={setAddressModal}
        oldaddress={address}
      />
      {loading && <Loader />}
      <div className="addresscardheader">
        <div className="achdetails">
          <p className="achname">
            {address.vFirstname} {address.vLastName}
          </p>
          <p className="achaddresstype">{address.eAddressType}</p>
        </div>
        <div>
          <IconButton
            id="basic-button"
            sx={{
              color: "gray",
              ":& hover": {
                backgroundColor: "gray",
              },
            }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
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
                color: "rgb(116, 116, 116)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setAddressModal(true);
                handleClose();
              }}
            >
              <Edit /> Edit
            </MenuItem>
            <MenuItem
              sx={{
                color: "rgb(233, 75, 75)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={handleDelete}
            >
              <Delete /> Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="addresscardbody">
        <p className="acbp">
          {address.vHouse},{address.vArea},{address.vCity},{address.vState}-
          {address.vPincode}
        </p>
      </div>
      <div className="addresscardfooter">
        <p className="acfphone">{address.vPhone}</p>
      </div>
    </div>
  );
};

export default AddressCard;
