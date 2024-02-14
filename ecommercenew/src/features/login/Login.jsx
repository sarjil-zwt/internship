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
import { login } from "../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import "./login.css";
import { baseUrl } from "../../configs/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (userState.isLoggedIn) {
      navigate("/");
      console.log("//");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `/auth/login`,
        { vEmail: email, vPassword: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(login(res.data));
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successfull");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error in login");
      })
      .finally(() => {
        setLoading(false);
      });
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>
            <Link to="/signup">
              <Typography component="p" align="right" color="primary">
                New User ? SignUp
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
