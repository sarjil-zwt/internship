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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);

    console.log(image);
    const formData = new FormData();

    formData.append("vName", name);
    formData.append("vEmail", email);
    formData.append("vPassword", password);
    formData.append("vImage", image);

    // console.log(formData);

    try {
      const res = await axios.post(`/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      dispatch(login(res.data));
      localStorage.setItem("token", res.data.token);
      toast.success("Registration Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="login">
      {loading && <Loader />}
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="file"
              name="vImage"
              src={image}
              onChange={handleImageChange}
              alt=""
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
