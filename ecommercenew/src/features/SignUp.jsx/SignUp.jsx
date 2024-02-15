import {
  CloseFullscreen,
  CloudUpload,
  LockOutlined,
} from "@mui/icons-material";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import "./SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   console.log(image);
  //   const formData = new FormData();

  //   formData.append("vName", name);
  //   formData.append("vEmail", email);
  //   formData.append("vPassword", password);
  //   formData.append("vImage", image);

  //   // console.log(formData);

  // };

  const LoginSchema = Yup.object().shape({
    vName: Yup.string().required("Name is required"),
    vEmail: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    vPassword: Yup.string()
      .required("Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      vEmail: "",
      vPassword: "",
      vName: "",
      vImage: "",
      imagePreview: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);

      try {
        const res = await axios.post(`/auth/signup`, formik.values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(login(res.data));
        localStorage.setItem("token", res.data.token);
        toast.success("Registration Successful");
        navigate("/");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("imagePreview", reader.result);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("vImage", file);
    }
  };
  return (
    <div className="signup">
      {loading && <Loader />}
      <div className="signupcontentwrapper">
        <div className="signupheading">
          <Avatar className="previewimage" src={formik.values.imagePreview} />
          <Typography
            variant="h3"
            sx={{
              color: "#1976d2",
            }}
          >
            Sign up
          </Typography>
        </div>
        <form onSubmit={formik.handleSubmit} noValidate className="customform">
          <TextField
            error={formik.errors.vName && formik.touched.vName ? true : false}
            fullWidth
            id="outlined-error-helper-text"
            label="Name"
            helperText={
              formik.errors.vName && formik.touched.vName
                ? formik.errors.vName
                : " "
            }
            name="vName"
            onChange={formik.handleChange}
            value={formik.values.vName}
            className="customtextfield"
          />
          <TextField
            error={formik.errors.vEmail ? true : false}
            fullWidth
            id="outlined-error-helper-text"
            label="Email"
            helperText={
              formik.errors.vEmail && formik.touched.vEmail
                ? formik.errors.vEmail
                : " "
            }
            name="vEmail"
            onChange={formik.handleChange}
            value={formik.values.vEmail}
          />
          <TextField
            error={formik.errors.vPassword ? true : false}
            fullWidth
            id="outlined-error-helper-text"
            label="Password"
            helperText={
              formik.errors.vPassword && formik.touched.vPassword
                ? formik.errors.vPassword
                : " "
            }
            name="vPassword"
            onChange={formik.handleChange}
            value={formik.values.vPassword}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            fullWidth
            sx={{
              mb: 2,
            }}
          >
            Profile Picture
            <TextField
              sx={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              }}
              type="file"
              name="vImage"
              onChange={(e) => handleImagePreview(e)}
            />
          </Button>
          <Button variant="contained" type="submit" tabIndex={-1} fullWidth>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
