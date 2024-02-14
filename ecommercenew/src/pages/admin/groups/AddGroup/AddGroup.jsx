import Loader from "../../../../components/loader/Loader";
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
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddGroup = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `/groups`,
        { vName: name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success("Group added successfully !!");
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

  return (
    <div className="addcategory">
      {loading && <Loader />}
      <Typography component="h1" variant="h5">
        Add Group
      </Typography>
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
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="group"
              label="group"
              name="group"
              autoComplete="group"
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
              Add Group
            </Button>

            <Link to="/admin/categories/all">
              <Typography component="p" align="right" color="primary">
                See all groups
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AddGroup;
