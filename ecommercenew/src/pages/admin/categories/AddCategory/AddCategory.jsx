import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";
import "./AddCategory.css";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `/categories`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success("Category added successfully !!");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(
          err.response.data.message ||
            "Something went wrong please try again later!!"
        );
      });
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="addcategory">
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          margin: 0,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Category
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="category"
              name="category"
              autoComplete="category"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Add Category
            </Button>
            <Link to="/admin/categories/all">
              <Typography component="p" align="right" color="primary">
                See all categories
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AddCategory;
