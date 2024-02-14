import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  const [group, setGroup] = useState("");

  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/groups")
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `/categories`,
        { vName: name, iGroupId: group },
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

  return (
    <div className="addcategory">
      {loading && <Loader />}
      <Typography component="h1" variant="h5">
        Add Category
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={age}
                sx={{
                  width: "100%",
                }}
                className="textfield"
                defaultValue=""
                label="Select Group"
                onChange={(e) => setGroup(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {groups &&
                  groups?.map((g) => {
                    return <MenuItem value={g.id}>{g.vName}</MenuItem>;
                  })}
                <MenuItem value="">
                  <Link
                    className="missingcategoryoption"
                    to="/admin/categories/add"
                  >
                    Missing Category? Add One
                  </Link>
                </MenuItem>
              </Select>
            </FormControl>
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
