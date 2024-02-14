import React, { useEffect, useState } from "react";
import "./EditCategoryModal.css";
import Modal from "@mui/material/Modal";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProductsState } from "../../../../../redux/features/productSlice";

const EditCategoryModal = ({ open, setOpen, c, setCategories }) => {
  const [category, setCategory] = useState({ c });
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCategory({ ...c });
  }, [c]);

  const handleSubmit = async () => {
    axios
      .put(`/categories/${category.id}`, category)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        updateCategories(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(res.);

    handleClose();
  };

  const updateCategories = (uc) => {
    setCategories((prevCategories) => {
      return prevCategories.map((c) => (c.id === category.id ? uc : c));
    });
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
        <div className="editmodaldiv">
          <Typography component="h1" variant="h5">
            Edit Category
          </Typography>
          <Container
            component="main"
            maxWidth="sm"
            sx={{
              margin: 0,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              className="textfield"
              onChange={(e) =>
                setCategory((category) => ({
                  ...category,
                  name: e.target.value,
                }))
              }
              value={category.name}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              Edit Category
            </Button>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default EditCategoryModal;
