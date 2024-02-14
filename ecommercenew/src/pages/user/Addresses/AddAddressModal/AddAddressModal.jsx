import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "./AddAddressModal.css";
import { GpsFixed } from "@mui/icons-material";
import axios from "axios";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../../redux/features/addressSlice";

const AddAddressModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    addresstype: "Home",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePinCodeChange = async (e) => {
    const newPincode = e.target.value;
    setAddress((address) => ({
      ...address,
      pincode: newPincode,
    }));

    if (newPincode.length === 6) {
      setLoading(true);
      await axios
        .get(`https://api.postalpincode.in/pincode/${newPincode}`)
        .then((res) => {
          console.log(res.data);

          if (res.data[0].Status === "Error") {
            toast.error("Invalid Pincode");
            setAddress((address) => ({
              ...address,
              pincode: "",
            }));
            return;
          }

          console.log(res.data[0].PostOffice[0].State);

          setAddress((address) => ({
            ...address,
            state: res.data[0].PostOffice[0].State,
            city: res.data[0].PostOffice[0].Name,
          }));
          console.log(address);
        })
        .catch((err) => {
          console.log(err.response?.data[0]?.Message, "*****************");
          toast.error(
            err.response?.data[0]?.Message || "Error fetching pincode details"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      address.fullname == "" ||
      address.phone == "" ||
      address.area == "" ||
      address.city == "" ||
      address.pincode == "" ||
      address.state == "" ||
      address.house == ""
    ) {
      return toast.error("Please provide all details");
    }
    setLoading(true);
    await axios
      .post("/addresses", address, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("address added successfully!");
        dispatch(addAddress(res.data.newAddress));
        setAddress({
          fullname: "",
          phone: "",
          pincode: "",
          state: "",
          city: "",
          house: "",
          area: "",
          addresstype: "",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };
  return (
    <div>
      {loading && <Loader />}
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
        <div className="addaddressmodaldiv">
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="FullName (Required)"
            name="fullname"
            autoComplete="fullname"
            autoFocus
            // className="textfield"
            onChange={(e) =>
              setAddress((address) => ({
                ...address,
                fullname: e.target.value,
              }))
            }
            value={address.fullname}
          />

          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="phone"
            label="Phone (Required)"
            name="phone"
            autoComplete="phone"
            autoFocus
            className="textfield"
            onChange={(e) =>
              setAddress((address) => ({
                ...address,
                phone: e.target.value,
              }))
            }
            value={address.phone}
          />
          <div className="doubleimputswrapper">
            <TextField
              margin="normal"
              required
              fullWidth
              id="pincode"
              label="Pincode (Required)"
              name="pincode"
              autoComplete="pincode"
              autoFocus
              className="textfield"
              onChange={(e) => handlePinCodeChange(e)}
              value={address.pincode}
              sx={{
                width: "100%",
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "8px 0px",
              }}
            >
              <GpsFixed /> Use My Location
            </Button>
          </div>

          <div className="doubleimputswrapper">
            <TextField
              margin="normal"
              required
              fullWidth
              id="state"
              label="State (Required)"
              name="state"
              autoComplete="state"
              className="textfield"
              onChange={(e) =>
                setAddress((address) => ({
                  ...address,
                  state: e.target.value,
                }))
              }
              value={address.state}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City (Required)"
              name="city"
              autoComplete="city"
              className="textfield"
              onChange={(e) =>
                setAddress((address) => ({
                  ...address,
                  city: e.target.value,
                }))
              }
              value={address.city}
            />
          </div>

          <TextField
            margin="normal"
            required
            fullWidth
            id="house"
            label="House No., Building name (Required)"
            name="house"
            autoComplete="house"
            className="textfield"
            onChange={(e) =>
              setAddress((address) => ({
                ...address,
                house: e.target.value,
              }))
            }
            value={address.house}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="area"
            label="Road Name, Area, Colony (Required)"
            name="area"
            autoComplete="area"
            className="textfield"
            onChange={(e) =>
              setAddress((address) => ({
                ...address,
                area: e.target.value,
              }))
            }
            value={address.area}
          />

          <FormControl
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              padding: "10px",
              width: "calc(100% - 20px)",
              marginTop: "16px",
              marginBottom: "8px",
            }}
          >
            <FormLabel id="demo-controlled-radio-buttons-group">
              Address Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              onChange={(e) =>
                setAddress((address) => ({
                  ...address,
                  addresstype: e.target.value,
                }))
              }
              value={address.addresstype}
              row
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "50px",
              }}
            >
              <FormControlLabel value="Home" control={<Radio />} label="Home" />
              <FormControlLabel value="Work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>

          <div className="addaddressbtnwrapper">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAddressModal;
