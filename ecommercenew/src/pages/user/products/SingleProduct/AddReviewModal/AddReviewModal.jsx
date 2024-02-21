import React, { useEffect, useState } from "react";
import "./AddReviewModal.css";
import Modal from "@mui/material/Modal";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProductsState } from "../../../../../redux/features/productSlice";
import { addReview } from "../../../../../redux/features/singleProductSlice";

const AddReviewModal = ({ open, setOpen, pId }) => {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [review, setReview] = useState({
    fRating: 0,
    vReview: "",
    vTagline: "",
  });

  useEffect(() => {
    if (!open) {
      setReview({
        fRating: 0,
        vReview: "",
        vTagline: "",
      });
    }
  }, [open]);

  const handleSubmit = async () => {
    console.log(review);
    axios
      .post(`/reviews`, { ...review, iProductId: pId })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        dispatch(addReview(res.data.review));
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(res.);

    handleClose();
  };

  // const updateCategories = (uc) => {
  //   setCategories((prevCategories) => {
  //     return prevCategories.map((c) => (c.id === category.id ? uc : c));
  //   });
  // };
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
        <div className="addreviewmodaldiv">
          <Typography component="h1" variant="h5">
            Add Review
          </Typography>

          <div className="reviewInputWrapper">
            <Rating
              name="simple-controlled"
              value={review.fRating}
              onChange={(event, newValue) => {
                setReview({ ...review, fRating: newValue });
              }}
            />
            <TextField
              id=""
              label="Review Tagline"
              multiline
              value={review.vTagline}
              sx={{ width: "100%" }}
              onChange={(e) => {
                setReview({ ...review, vTagline: e.target.value });
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Review"
              multiline
              rows={4}
              value={review.vReview}
              sx={{ width: "100%" }}
              onChange={(e) => {
                setReview({ ...review, vReview: e.target.value });
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddReviewModal;
